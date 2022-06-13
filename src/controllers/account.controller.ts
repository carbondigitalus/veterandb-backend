// NPM Modules
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Patch,
    Post,
    UseGuards
} from '@nestjs/common';
import { User } from './../database';

// Custom Modules
import { GetUser, JWTGuard } from './../utils';

// setup all subsequent controller methods to access jwt guard
// route: /account
@UseGuards(JWTGuard)
@Controller('account')
export class AccountController {
    // create constructor
    // access user service data
    constructor() {}

    // route: /account/deactivate
    @Delete('deactivate')
    accountDeactivate() {}

    // route: /account/login
    @Post('login')
    accountLogin() {}

    // route: /account/logout
    @Get('logout')
    accountLogout() {}

    // route: /account/password-forgot
    @Post('password-forgot')
    accountPasswordForgot() {}

    // route: /account/password-reset/:id
    @Patch('password-reset/:token')
    accountPasswordReset() {}

    // route: /account/register
    @Post('register')
    accountRegister() {}

    // route: /account/update-profile
    @Patch('update-profile')
    accountUpdateProfile() {}

    // route: /account/update-settings
    @Patch('update-settings')
    accountUpdateSettings() {}
}
