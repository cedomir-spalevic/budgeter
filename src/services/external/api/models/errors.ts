export class AlreadyExistsError extends Error {}

export class EmailNotVerifiedError extends Error {}

export class NotFoundError extends Error {}

export class UnauthorizedError extends Error {}

export class GeneralError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class InternalServerError extends Error {
    constructor(message: string) {
        super(message);
    }
}