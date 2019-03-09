
import { ILog } from './log.interface';
import { MongoDB } from '../utils/mongo.db';

export class LogRepository {
    static create(log: ILog) {
        return MongoDB.insert('logs', log);
    }

    static getMany(logFilter: Partial<ILog>, startIndex: number = 0, endIndex: number = 10) {
        return MongoDB.getMany('logs', logFilter, startIndex, startIndex + endIndex);
    }
}