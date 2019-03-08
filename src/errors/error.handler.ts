import { ServerResponse } from 'http';
import { UserError, ApplicationError } from './applicationError';

export function errorHandler(res: ServerResponse, error: ApplicationError | void) {
    if (!error) return;

    userErrorHandler(res, error);
}

export function userErrorHandler(res: ServerResponse, error: UserError) {
    if (error instanceof UserError) {
        res.writeHead(error.status || 400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(error));
    };
}
