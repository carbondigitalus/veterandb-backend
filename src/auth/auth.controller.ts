import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthData } from './data';

@Controller('users')
export class AuthController {
}
