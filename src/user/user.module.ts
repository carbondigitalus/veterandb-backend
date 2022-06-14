// NPM Module
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Custom Module
import { UserController } from './../controllers';
import { User } from 'src/database';
import { UserService } from './../services';

// create module with decorator
// create user module class
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [TypeOrmModule],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
