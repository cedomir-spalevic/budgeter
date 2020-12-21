export class AlreadyExistsError extends Error {}

export class NoUserFoundError extends Error {}

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