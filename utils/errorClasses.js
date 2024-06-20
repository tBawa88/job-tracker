import { StatusCodes } from "http-status-codes";

export class AuthError extends Error {

    constructor (message) {
        super(message);
        this.message = message;
        this.status = StatusCodes.UNAUTHORIZED
    }
}

export class NotFoundError extends Error {

    constructor (message) {
        super(message);
        this.message = message;
        this.status = StatusCodes.NOT_FOUND
    }
}

export class ServerError extends Error {

    constructor (message) {
        super(message);
        this.message = message;
        this.status = StatusCodes.INTERNAL_SERVER_ERROR
    }
}

export class UnauthorizedError extends Error {
    constructor (message) {
        super(message);
        this.message = message;
        this.status = StatusCodes.FORBIDDEN
    }
}