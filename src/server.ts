// NPM Modules
const dotenv = require('dotenv');
const tsDBConnect = require('typeorm');
require('reflect-metadata');

// NPM Module Imports
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

// Custom Modules
import { AppModule } from './app.module';
import { User } from './db/entity';

// Enable Config File
dotenv.config({
    path: './config.env'
});

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

    });
