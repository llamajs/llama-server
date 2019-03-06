"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    db: {
        host: process.env.DB_SERVER || 'localhost',
        name: process.env.DB_NAME || 'llamaLogs',
        port: +(process.env.DB_PORT || 27017),
    },
    rabbitMQ: {
        host: process.env.RMQ_HOST || 'localhost',
        port: +(process.env.RMQ_PORT || 5672),
        password: process.env.RMQ_PASSWORD || 'guest',
        username: process.env.RMQ_USERNAME || 'guest',
        exchange: process.env.RMQ_EXCHANGE || 'llamaLogs',
        exchangeType: process.env.RMQ_EXCHANGE_TYPE || 'topic',
        queue: process.env.RMQ_QUEUE || 'logs',
    },
    server: {
        port: +(process.env.PORT || 3000),
        name: 'log',
    },
};
//# sourceMappingURL=config.js.map