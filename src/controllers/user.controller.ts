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

    // route: /users/account-register
    @Post('account-register')
    accountRegister() {}

    // route: /users/account-update-profile
    @Patch('account-update-profile')
    accountUpdateProfile() {}

    // route: /users/account-update-settings
    @Patch('account-update-settings')
    accountUpdateSettings() {}

    // route: /users
    @Post()
    userCreateOne() {}

    // route: /users/:id
    @Delete(':id')
    userDeleteOne() {}

    // route: /users
    @Get()
    usersGetAll() {}

    // create get request for /users/:id
    // get user formatted as user
    @Get(':id')
    usersGetOne(@GetUser() user: User) {
        return user;
    }
}
