// NPM Modules
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// Custom Modules
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTStrategy } from './strategy';

// create module decorator
// create class auth module
@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JWTStrategy]
})
export class AuthModule {}
