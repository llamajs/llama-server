
import * as rabbit from './utils/rabbit';
import { Server } from './server';
import { config } from './config';
import { LogSubscribeBroker } from './log/log.broker.subscribe';
import { LogRepository } from './log/log.repository';
import { MongoDB } from './utils/mongo.db';

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

        rabbit.closeConnection();
        process.exit(0);
    } catch (error) {
        console.error('Failed to close connections', error);
    }
});

(async () => {
    await MongoDB.connect();
    await rabbit.connect();
    await LogSubscribeBroker.subscribe();
    console.log('Starting server');
    Server.start();
})();
