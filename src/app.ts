// Core Modules

// NPM Modules
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

// NPM Module Classes
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

// Custom Modules

// Variables
const app: Application = express();

// GLOBAL MIDDLEWARE

// Setup Trust for Proxies (needed for Heroku)
app.enable('trust proxy');

// Template Engines
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

// Serving static files to the browser
app.use(express.static(`${__dirname}/dist`));

// Enable CORS
app.use(cors());

// Enable CORS internally
// app.use(
//   cors({
//     origin: 'https://veterandb.com'
//   })
// );
// Respond to Options request for CORS (pre-flight phase)
// Required for METHODS PUT/ PATCH/ DELETE
// app.options('*', cors());

// Security HTTP Headers
// Implementing helmet for the HTTP headers
app.use(helmet());

// Development environment (for logging)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Implementing a rate limiter for one hour
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour.'
});
app.use('/api', limiter);

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));
// URL encoded middleware option
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// Cookie Parser, reading the data from the cookies
app.use(cookieParser());
// Data sanitization against XSS attacks
app.use(xss());
// Prevent paramater pollution
app.use(
    hpp({
        whitelist: [
            'duration',
            'ratingsQuantity',
            'ratingsAverage',
            'maxGroupSize',
            'difficulty',
            'price'
        ]
    })
);

// Compression Middleware
app.use(compression());

