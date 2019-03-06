import { IncomingMessage, ServerResponse } from 'http';
import { LogManager } from './log.manager';
import { parse } from 'querystring';
import * as url from 'url';
import { ILog } from './log.interface';

export async function getHandler(req: IncomingMessage, res: ServerResponse) {
    if (req.method === 'GET') {
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

                startIndex = Number(query.startIndex || 0)
                endIndex = Number(query.endIndex || 10)
            }

            const logs = await LogManager.getLogs(filter, startIndex, endIndex);

            if (logs) {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(logs));
                return;
            }
        }
    }
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Only GET methods are allowed' }));
}