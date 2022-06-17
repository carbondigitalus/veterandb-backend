// NPM Modules
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Custom Modules
import { Business, Directory, FAQ, NonProfit, Podcast, User } from './database';
import { AccountModule } from './account/account.module';
import { UserModule } from './user/user.module';
import { BusinessModule } from './business/business.module';

// create module from decorator
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: 'config.env'
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_TABLE,
            entities: [Business, Directory, FAQ, NonProfit, Podcast, User],
            synchronize: true
        }),
        AccountModule,
        BusinessModule,
        UserModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
