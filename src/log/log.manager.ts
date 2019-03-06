import { ILog } from "./log.interface";
import { LogRepository } from "./log.repository";

export class LogManager {
    static getLogs(filter: Partial<ILog>, startIndex: number, endIndex: number) {
        return LogRepository.getMany(filter, startIndex, endIndex);
    }

    static createLog(log: ILog) {
        LogRepository.create(log);
    }
}