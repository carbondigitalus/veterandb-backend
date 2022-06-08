// NPM Modules
import {
    Controller,
    Delete,
    Get,
    Patch,
    Post,
    UseGuards
} from '@nestjs/common';
import { User } from './../database';

// Custom Modules
import { GetUser } from './../decorators';
import { JWTGuard } from './../utils';

// setup all subsequent controller methods to access jwt guard
// create controller with /users endpoint
// create user controller class
@UseGuards(JWTGuard)
@Controller('users')
export class UserController {
    // create constructor
    // access user service data
    constructor() {}

    // route: /users/account-deactivate
    @Delete('account-deactivate')
    accountDeactivate() {}

    // route: /users/account-login
    @Post('account-login')
    accountLogin() {}

    // route: /users/account-logout
    @Get('account-logout')
    accountLogout() {}

    // route: /users/account-password-forgot
    @Post('account-password-forgot')
    accountPasswordForgot() {}

    // route: /users/account-password-reset/:id
    @Patch('account-password-reset/:token')
    accountPasswordReset() {}

    // get user formatted as user
        return user;
    }
}
