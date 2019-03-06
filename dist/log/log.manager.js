"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_repository_1 = require("./log.repository");
class LogManager {
    static getLogs(filter, startIndex, endIndex) {
        return log_repository_1.LogRepository.getMany(filter, startIndex, endIndex);
    }
    static createLog(log) {
        log_repository_1.LogRepository.create(log);
    }
}
exports.LogManager = LogManager;
//# sourceMappingURL=log.manager.js.map