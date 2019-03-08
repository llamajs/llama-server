import * as url from 'url';
import { IncomingMessage } from 'http';
import { parse } from 'querystring';
import { UnknownUrlStructureError } from '../errors/errors';

export function parseQuery(req: IncomingMessage) {
    if (!req.url) throw new UnknownUrlStructureError();

    try {
        const parsedUrl = url.parse(req.url);

        if (!parsedUrl.query) return null;

        return parse(parsedUrl.query);

    } catch {
        throw new UnknownUrlStructureError();
    }
}