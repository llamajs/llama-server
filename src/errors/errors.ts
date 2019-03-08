import { UserError } from './applicationError';

export class ForbiddenMethodError extends UserError {
    constructor() {
        super('Only GET & POST methods are allowed', 405);
    }
}

export class UnknownUrlStructureError extends UserError {
    constructor() {
        super('Bad url structure', 400);
    }
}
