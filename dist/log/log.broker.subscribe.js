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
const rabbit = require("../utils/rabbit");
const config_1 = require("../config");
const log_manager_1 = require("./log.manager");
class LogSubscribeBroker {
    static subscribe() {
        return __awaiter(this, void 0, void 0, function* () {
            rabbit.subscribe(config_1.config.rabbitMQ.exchange, config_1.config.rabbitMQ.exchangeType, config_1.config.rabbitMQ.queue, '', (log) => __awaiter(this, void 0, void 0, function* () {
                console.log(log);
                log_manager_1.LogManager.createLog(log);
            }));
        });
    }
}
exports.LogSubscribeBroker = LogSubscribeBroker;
//# sourceMappingURL=log.broker.subscribe.js.map