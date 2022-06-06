// NPM Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// create module from decorator
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'test',
            entities: [],
            synchronize: true
        })
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
