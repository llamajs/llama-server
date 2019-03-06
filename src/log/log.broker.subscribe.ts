
import * as rabbit from '../utils/rabbit';
import { config } from '../config';
import { ILog } from './log.interface';
import { LogManager } from './log.manager';

export class LogSubscribeBroker {
    public static async subscribe() {
        rabbit.subscribe(
        config.rabbitMQ.exchange,
        config.rabbitMQ.exchangeType,
        config.rabbitMQ.queue,
        '*',
        async (log: ILog) => {
            LogManager.createLog(log);
        });
    }
}
