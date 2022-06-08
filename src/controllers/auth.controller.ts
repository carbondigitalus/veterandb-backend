// NPM Modules
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

// Custom Modules
import { AuthService } from '../services';
import { AuthData } from './../models';

// create controller with decorator
// create auth controller class with /users endpoint
@Controller('users')
export class AuthController {
    // create constructor
    // import auth service data
    constructor(private authService: AuthService) {}

    // create post request with /users/login endpoint
    // create login function
    // capture req.body in data variable
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() data: AuthData) {
        // use login function with captured data
        return this.authService.login(data);
    }

    // create post request with /users/register endpoint
    // create register function
    // capture req.body in data variable
    @Post('register')
    register(@Body() data: AuthData) {
        // use register function with captured data
        return this.authService.register(data);
    }
}
