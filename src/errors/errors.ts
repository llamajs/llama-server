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

export class RequestMissingBodyError extends UserError {
    constructor() {
        super('Request has no body', 400);
    }
}

export class UnknownBodyStructureError extends UserError {
    constructor() {
        super('Bad body structure', 400);
    }
}
