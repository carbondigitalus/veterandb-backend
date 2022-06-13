// NPM Module
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Custom Module
import { UserController } from './../controllers';
import { UserService } from './../services';

// create module with decorator
// create user module class
@Module({
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
