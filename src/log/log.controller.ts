import { IncomingMessage, ServerResponse } from 'http';
import { LogManager } from './log.manager';
import { ILog } from './log.interface';
import { ServerError } from '../errors/applicationError';
import { bodyParser } from '../utils/body.parser';
import { parseQuery } from '../utils/query.parser';

export async function getHandler(req: IncomingMessage, res: ServerResponse) {
    const query = parseQuery(req) || {};

    let startIndex = 0;
    let endIndex = 10;

    if (query) {
        startIndex = Number(query.startIndex || 0);
        endIndex = Number(query.endIndex || 10);

        delete query.startIndex;
        delete query.endIndex;
    }

    const logs = await LogManager.getLogs(query, startIndex, endIndex);

    if (!logs) throw new ServerError();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(logs));

    return;
}

export async function postHandler(req: IncomingMessage, res: ServerResponse) {
    const results = await LogManager.createLog(await bodyParser(req) as ILog);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(results));

    return;
}