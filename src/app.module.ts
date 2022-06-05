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
import { ErrorController } from './controllers';
import UserRouter from './routes/userRoutes';
import { AppError } from './utils';

//Variables
const app: Application = express();

// Setup Trust for Proxies (needed for Heroku)
app.enable('trust proxy');

// Template Engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

// Serving static files to the browser
app.use(express.static(path.join(__dirname, '/dist')));

// Global Middleware Declarations

// Enable CORS Globally
// Header: Access-Control-Allow-Origin = *

app.use(cors());

// Enable CORS internally
// app.use(
//   cors({
//     origin: 'https://natours.com'
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

// Stripe Webhook for Checkout Session End
// app.post(
//   '/webhook-checkout',
//   express.raw({ type: 'application/json' }),
//   bookingController.webhookCheckout
// );

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

// Mounted API Routes
const apiVersion = 'v1';
const apiRoutes = `/api/${apiVersion}`;
app.use(`${apiRoutes}/users`, UserRouter);
// app.use(`${apiRoutes}/projects`, projectRouter);

// Mounted View Routes
// app.use('/', viewRouter);

// // Global Error Handlers
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    console.log(req, res);
    next(new AppError(`Can't find ${req.url} on this server!`, 404));
});
app.use(ErrorController);

module.exports = app;
