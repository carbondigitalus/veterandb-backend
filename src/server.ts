// NPM Modules
const dotenv = require('dotenv');
const tsDBConnect = require('typeorm');
require('reflect-metadata');

// NPM Module Imports
// Custom Modules
import { User } from './db/entity';

// Enable Config File
dotenv.config({
    path: './config.env'
});

// Import Express App from app.ts
const appServer = require('./app');

// Connect to MySQL DB
tsDBConnect
    .createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        logging: false,
        entities: [User]
    })
    .then(() => {
        // here you can start to work with your entities
        console.log('MySQL Database Connection Status: success');
    })
    .catch((error: any) => console.log(error));

// Enable Ports based on ENV
let port: any;
let appEnv = process.env.NODE_ENV;
const getPort = (appEnv: any) => {
    if (appEnv === 'production') {
        port = process.env.PORT_PROD;
    } else if (appEnv === 'development') {
        port = process.env.PORT_DEV;
    } else {
        port = process.env.PORT_TEST;
    }
    return port;
};

// Enable Test Server
const server = appServer.listen(getPort(appEnv), () => {
    console.log(`Node App Running, Port: ${port}`);
    console.log(`Current Node Environment: ${appEnv}`);
});

// Uncaught Exceptions
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
