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

