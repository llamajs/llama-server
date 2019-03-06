"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const config_1 = require("./config");
const log_controller_1 = require("./log/log.controller");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.server = http.createServer(log_controller_1.getHandler);
        this.server.listen(config_1.config.server.port, () => {
            console.log(`Server running in ${process.env.NODE_ENV || 'development'} environment on port ${config_1.config.server.port}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map