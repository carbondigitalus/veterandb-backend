// NPM Modules
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

// Custom Modules
import { AccountService } from '../services';
import { AccountDataModel } from '../utils';

// create controller with decorator
// create auth controller class with /users endpoint
@Controller('users')
export class AccountController {
    // create constructor
    // import auth service data
    constructor(private accountService: AccountService) {}

    // create post request with /users/login endpoint
    // create login function
    // capture req.body in data variable
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() data: AccountDataModel) {
        // use login function with captured data
        return this.accountService.login(data);
    }

    // create post request with /users/register endpoint
    // create register function
    // capture req.body in data variable
    @Post('register')
    register(@Body() data: AccountDataModel) {
        // use register function with captured data
        return this.accountService.register(data);
    }
}
