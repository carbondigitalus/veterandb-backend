// NPM Modules
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

// Custom Modules
import { AppModule } from './app.module';

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

    // listen on express app port
    await app.listen(8000);
}
// start app
bootstrap();
