// NPM Modules
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

// Custom Modules
import { AccountController } from '../controllers';
import { AccountService } from '../services';
import { JWTStrategy } from '../utils';

// create module decorator
// create class auth module
@Module({
    imports: [JwtModule.register({}), TypeOrmModule.forFeature([User])],
    exports: [TypeOrmModule],
    controllers: [AccountController],
    providers: [AccountService, JWTStrategy]
})
export class AccountModule {}
