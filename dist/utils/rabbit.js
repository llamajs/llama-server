"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib = require("amqplib");
const config_1 = require("../config");
let connection;
let publishChannel;
const defualtSubscribeOptions = {
    consumer: {
        noAck: false,
    },
    exchange: {
        durable: true,
    },
    queue: {
        durable: true,
    },
    channel: {},
};
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password, host, port } = config_1.config.rabbitMQ;
        connection = yield amqplib.connect(`amqp://${username}:${password}@${host}:${port}`);
        console.log(`[RabbitMQ] connected on port ${port}`);
        return connection;
    });
}
exports.connect = connect;
function closeConnection() {
    if (connection) {
        connection.close();
    }
}
exports.closeConnection = closeConnection;
function subscribe(exchange, type, queue, pattern, messageHandler, options = defualtSubscribeOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!connection) {
            throw new Error('No connection available');
        }
        const channel = yield connection.createChannel();
        yield channel.assertExchange(exchange, type, options.exchange);
        if (options.channel.prefetch) {
            channel.prefetch(options.channel.prefetch);
        }
        const assertedQueue = yield channel.assertQueue(queue, options.queue);
        yield channel.bindQueue(assertedQueue.queue, exchange, pattern);
        channel.consume(queue, (message) => __awaiter(this, void 0, void 0, function* () {
            if (message) {
                const messageString = message.content.toString();
                try {
                    yield messageHandler(JSON.parse(messageString));
                    channel.ack(message);
                }
                catch (err) {
                    channel.nack(message, false, false);
                }
            }
        }), options.consumer);
        return channel;
    });
}
exports.subscribe = subscribe;
function publish(exchange, type, routingKey, message, options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!publishChannel) {
            publishChannel = yield connection.createChannel();
            yield publishChannel.assertExchange(exchange, type, { durable: true });
        }
        publishChannel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), Object.assign({ persistent: true }, options));
    });
}
exports.publish = publish;
//# sourceMappingURL=rabbit.js.map