export class AppError extends Error {
    isOperational: boolean;
    status: string;
    message: string;
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
