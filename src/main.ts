// Core Modules
import { join } from 'path';

// NPM Modules
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';

// Custom Modules
import { AppModule } from './app.module';
import { DataResponseInterceptor } from './utils/interceptors';

async function bootstrap() {
    // create express based app
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // use validation pipeline
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true
        })
    );
    // add url prefix with exceptions
    app.setGlobalPrefix('api/v1', {
        exclude: [
            '/',
            '/about',
            '/ads',
            '/contact',
            '/legal/terms-conditions',
            '/legal/privacy-policy',
            '/legal/shipping-policy',
            '/legal/return-policy',
            '/login',
            '/logout',
            '/press',
            '/register'
        ]
    });
    // setup global response wrapper for "data"
    app.useGlobalInterceptors(new DataResponseInterceptor());
    // setup global use of cookies
    app.use(cookieParser());
    // listen on express app port
    await app.listen(8000);
}
// start app
bootstrap();
