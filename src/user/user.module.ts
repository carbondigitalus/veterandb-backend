// NPM Module
import { Module } from '@nestjs/common';

// Custom Module
import { UserController } from './user.controller';
import { UserService } from './user.service';

// create module with decorator
// create user module class
@Module({
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
