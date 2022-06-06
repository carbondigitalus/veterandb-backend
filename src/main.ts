import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true
        })
    );
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
    await app.listen(3333);
}
bootstrap();
