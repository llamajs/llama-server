export const config = {
    db: {
        host: process.env.DB_SERVER || 'localhost',
        name: process.env.DB_NAME || 'llamaLogs',
        port: +(process.env.DB_PORT || 27017),
        collection: process.env.DB_COLLECTION || 'logs',
    },
    rabbitMQ: {
        host: process.env.RMQ_HOST || 'localhost',
        port: +(process.env.RMQ_PORT || 5672),
        password: process.env.RMQ_PASSWORD || 'guest',
        username: process.env.RMQ_USERNAME || 'guest',
        exchange: process.env.RMQ_EXCHANGE || 'Logs',
        exchangeType: process.env.RMQ_EXCHANGE_TYPE || 'fanout',
        queue: process.env.RMQ_QUEUE || 'logs',
    },
    server: {
        port:  +(process.env.PORT || 3000),
        name: 'log',
    },
};
