
import { ILog } from './log.interface';
import { MongoDB } from '../utils/mongo.db';
import { config } from '../config';

export class LogRepository {
    static create(log: ILog) {
        return MongoDB.insert(config.db.collection, log);
    }

    static getMany(logFilter: Partial<ILog>, startIndex: number = 0, endIndex: number = 10) {
        return MongoDB.getMany(config.db.collection, logFilter, startIndex, startIndex + endIndex);
    }
}