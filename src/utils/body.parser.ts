import { IncomingMessage } from "http";
import { UnknownBodyStructureError, RequestMissingBodyError } from "../errors/errors";
import { parse } from "querystring";

export async function bodyParser(req: IncomingMessage) {
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