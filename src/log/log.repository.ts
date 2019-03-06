
import { ILog } from './log.interface';
import { LogModel } from './log.model';

export class LogRepository {
    static create(log: ILog)
        : Promise<ILog> {
        return LogModel.create(log);
    }

    static getMany(logFilter: Partial<ILog>, startIndex: number = 0, endIndex: number = 0)
        : Promise<ILog[]> {
        return LogModel
        .find(logFilter)
        .skip(startIndex)
        .limit(endIndex - startIndex)
        .exec();
    }

    static getAmount(logFilter: Partial<ILog>)
        : Promise<number> {
        return LogModel
            .countDocuments(logFilter)
            .exec();
    }
}
