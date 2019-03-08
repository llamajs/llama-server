import * as http from 'http';
import { config } from './config';
import { router } from './log/log.router';
import { errorHandler } from './errors/error.handler';

export class Server {
    private server: http.Server;

    public static start(): Server {
        return new Server();
    }

    private constructor() {
        this.server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
            router(req, res).catch(error => { errorHandler(res, error) });
        });

        this.server.listen(config.server.port, () => {
            console.log(`Server running in ${process.env.NODE_ENV || 'development'} environment on port ${config.server.port}`);
        });
    }
}
