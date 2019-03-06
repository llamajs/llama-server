import * as http from 'http';
import { config } from './config';
import { getHandler } from './log/log.controller';

export class Server {
    private server: http.Server;

    public static bootstrap(): Server {
        return new Server();
    }

    private constructor() {
        this.server = http.createServer(getHandler);
        this.server.listen(config.server.port, () => {
            console.log(`Server running in ${process.env.NODE_ENV || 'development'} environment on port ${config.server.port}`);


        });
    }
}
