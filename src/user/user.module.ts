// NPM Module
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Custom Module
import { User } from 'src/database';
import { UserController } from './user.controller';
import { UserService } from './user.service';

// create module with decorator
// create user module class
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [TypeOrmModule],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
