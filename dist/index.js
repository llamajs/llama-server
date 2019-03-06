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
const mongoose = require("mongoose");
const rabbit = require("./utils/rabbit");
const server_1 = require("./server");
const config_1 = require("./config");
const log_broker_subscribe_1 = require("./log/log.broker.subscribe");
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
process.on('SIGINT', () => __awaiter(this, void 0, void 0, function* () {
    try {
        console.log('User Termination');
        yield mongoose.disconnect();
        rabbit.closeConnection();
        process.exit(0);
    }
    catch (error) {
        console.error('Failed to close connections', error);
    }
}));
(() => __awaiter(this, void 0, void 0, function* () {
    yield mongoose.connect(`mongodb://${config_1.config.db.host}:${config_1.config.db.port}/${config_1.config.db.name}`, { useNewUrlParser: true });
    console.log(`[MongoDB] connected to port ${config_1.config.db.port}`);
    yield rabbit.connect();
    yield log_broker_subscribe_1.LogSubscribeBroker.subscribe();
    console.log('Starting server');
    const server = server_1.Server.bootstrap();
}))();
//# sourceMappingURL=index.js.map