
import * as mongoose from 'mongoose';
import * as rabbit from './utils/rabbit';
import { Server } from './server';
import { config } from './config';
import { LogSubscribeBroker } from './log/log.broker.subscribe';

process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err.stack);

    rabbit.closeConnection();
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection', err);

    rabbit.closeConnection();
    process.exit(1);
});

process.on('SIGINT', async () => {
    try {
        console.log('User Termination');

        await mongoose.disconnect();

        rabbit.closeConnection();
        process.exit(0);
    } catch (error) {
        console.error('Failed to close connections', error);
    }
});

(async () => {
    await mongoose.connect(
        `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`,
        { useNewUrlParser: true },
    );

    console.log(`[MongoDB] connected to port ${config.db.port}`);

    await rabbit.connect();
    await LogSubscribeBroker.subscribe();
    console.log('Starting server');
    const server: Server = Server.start();
})();
