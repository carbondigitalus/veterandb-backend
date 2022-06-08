// NPM Modules
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// Custom Modules
import { AccountController } from '../controllers';
import { AccountService } from '../services';
import { JWTStrategy } from '../utils';

// create module decorator
// create class auth module
@Module({
    imports: [JwtModule.register({})],
    controllers: [AccountController],
    providers: [AccountService, JWTStrategy]
})
export class AccountModule {}
