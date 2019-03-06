import { IncomingMessage, ServerResponse } from 'http';
import { LogManager } from './log.manager';
import { parse } from 'querystring';
import * as url from 'url';
import { ILog } from './log.interface';

export async function getHandler(req: IncomingMessage, res: ServerResponse) {
    if (req.method === 'GET') {
        if (req.url) {
            const parsedUrl = url.parse(req.url);

            if (parsedUrl.query) {
                const query = parse(parsedUrl.query);
                const filter = {
                    severity: query.severity,
                    name: query.name,
                    description: query.description,
                    hostname: query.hostname,
                    service: query.service,
                } as Partial<ILog>;

                const logs = await LogManager.getLogs(filter, Number(query.startIndex || 0), Number(query.endIndex || 0));

                if (logs) {
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify(logs));
                }
            }
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: 'Could not get logs' }));
        }
    }
}