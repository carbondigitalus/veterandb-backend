// NPM Modules
import { Request, Response, NextFunction } from 'express';

// Custom Modules
import { AppError } from '../utils';

// Custom Classes
class CustomError extends TypeError {
    path?: string;
    value?: any;
    errmsg?: any;
    errors?: any;
    status?: any;
    statusCode?: any;
    isOperational?: boolean;
    code?: number;
}

export const ErrorController = (fn: any) => {
    return (
        err: CustomError,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        fn(req, res, next).catch(next);

        err.statusCode = err.statusCode || 500;
        err.status = err.status || 'error';

        if (process.env.NODE_ENV === 'development') {
            sendErrorDev(err, req, res);
        } else if (process.env.NODE_ENV === 'production') {
            let error = { ...err };
            error.message = error.message;
            if (error.name === 'CastError') error = handleCastErrorDB(error);
            if (error.code === 11000) error = handleDuplicateFieldsDB(error);
            if (error.name === 'ValidationError')
                error = handleValidationErrorDB(error);
            if (error.name === 'JsonWebTokenError') error = handleJWTError();
            if (error.name === 'TokenExpiredError')
                error = handleJWTExpiredError();
            sendErrorProd(error, req, res);
        }
        next();
    };
};

function handleCastErrorDB(error: CustomError) {
    const message = `Invalid ${error.path}: ${error.value}.`;
    return new AppError(message, 400);
}

function handleDuplicateFieldsDB(error: CustomError) {
    const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    // console.log(value);
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
}

function handleJWTError() {
    return new AppError('Invalid token. Please login again.', 401);
}

function handleJWTExpiredError() {
    return new AppError('Your token has expired. Please login again.', 401);
}

function handleValidationErrorDB(error: CustomError) {
    const errors = Object.values(error.errors).map((el: any) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
}

function sendErrorDev(error: CustomError, req: Request, res: Response) {
    // If the route contains 'API' send JSON
    if (req.originalUrl.startsWith('/api')) {
        res.status(error.statusCode).json({
            status: error.status,
            error: error,
            message: error.message,
            stack: error.stack
        });
    } else {
        // Otherwise, send the 404 page.
        res.status(error.statusCode).render('error', {
            title: 'Something went wrong!',
            msg: error.message
        });
    }
}

function sendErrorProd(error: CustomError, req: Request, res: Response) {
    if (req.originalUrl.startsWith('/api') && error.isOperational) {
        // If the route contains 'API'
        // AND the error IS Operational
        // Send JSON
        // Operational errors, trusted error: send the message to the client
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message
        });
    } else if (req.originalUrl.startsWith('/api') && !error.isOperational) {
        // If the route contains 'API'
        // AND the error IS NOT Operational
        // Non-Operational Error: Programming or other unknown error
        // Non-Operational Errors: don't leak error details to client
        // Send generic response
        console.log('Error', error);
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong.'
        });
    } else if (!req.originalUrl.startsWith('/api') && error.isOperational) {
        // If the route does NOT contain 'API'
        // AND if the error IS OPERATIONAL
        // Send the normal JSON
        console.log(error);
        res.status(error.statusCode).render('error', {
            title: 'Something went wrong!',
            msg: error.message
        });
    } else {
        // Otherwise, send the 404 page.
        res.status(error.statusCode).render('error', {
            title: 'Something went wrong!',
            msg: 'Please try again later.'
        });
    }
}
