// NPM Modules
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// Custom Modules
import { AuthController } from '../controllers';
import { AuthService } from '../services';
import { JWTStrategy } from '../strategies';

// create module decorator
// create class auth module
@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JWTStrategy]
})
export class AuthModule {}
