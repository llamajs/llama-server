import { IncomingMessage, ServerResponse } from 'http';
import { LogManager } from './log.manager';
import { parse } from 'querystring';
import * as url from 'url';
import { ILog } from './log.interface';
import { UnknownUrlStructureError, RequestMissingBodyError, UnknownBodyStructureError } from '../errors/errors';
import { ServerError, ApplicationError } from '../errors/applicationError';
import { reject } from 'bluebird';

export async function getHandler(req: IncomingMessage, res: ServerResponse) {
    if (req.url) {
        const parsedUrl = url.parse(req.url);
        let filter = {};
        let startIndex = 0;
        let endIndex = 10;

        if (parsedUrl.query) {
            const query = parse(parsedUrl.query);

            filter = {
                severity: query.severity,
                name: query.name,
                description: query.description,
                hostname: query.hostname,
                service: query.service,
            } as Partial<ILog>;

            startIndex = Number(query.startIndex || 0);
            endIndex = Number(query.endIndex || 10);
        }

        const logs = await LogManager.getLogs(filter, startIndex, endIndex);

        if (!logs) throw new ServerError();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(logs));
        return;
    }

    throw new UnknownUrlStructureError();
}

async function bodyParser(req: IncomingMessage) {
    if (req.headers["content-type"] !== 'application/x-www-form-urlencoded') throw new UnknownBodyStructureError();

    let data = '';

    req.on('data', (chunk) => {
        data += chunk.toString();
    });

    return new Promise((resolve, reject) => {
        req.on('data', () => {
            if (!data) return reject(new RequestMissingBodyError());
    
            try {
                return resolve(parse(data));
            } catch (error) {
                throw reject(new UnknownBodyStructureError());
            }
        });
    });
}

export async function postHandler(req: IncomingMessage, res: ServerResponse) {
    const body = await bodyParser(req);

    return LogManager.createLog(body as ILog);
}