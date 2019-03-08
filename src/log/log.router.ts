import { IncomingMessage, ServerResponse } from 'http';
import { getHandler, postHandler } from './log.controller';
import { ForbiddenMethodError } from '../errors/errors';

export function router(req: IncomingMessage, res: ServerResponse) {
    switch (req.method) {
        case 'GET':
            return getHandler(req, res);
        case 'POST':
            return postHandler(req, res)
        default:
            return new ForbiddenMethodError();
    }
}
