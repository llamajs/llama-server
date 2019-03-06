"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_model_1 = require("./log.model");
class LogRepository {
    static create(log) {
        return log_model_1.LogModel.create(log);
    }
    static getMany(logFilter, startIndex = 0, endIndex = 0) {
        return log_model_1.LogModel
            .find(logFilter)
            .skip(startIndex)
            .limit(endIndex - startIndex)
            .exec();
    }
    static getAmount(logFilter) {
        return log_model_1.LogModel
            .countDocuments(logFilter)
            .exec();
    }
}
exports.LogRepository = LogRepository;
//# sourceMappingURL=log.repository.js.map