// NPM Modules
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Patch,
    Post,
    UseGuards
} from '@nestjs/common';

// Custom Modules
import { AccountService } from './account.service';
import { AccountDTO } from './dto/account.dto';
import { JWTGuard } from './../utils';

// setup all subsequent controller methods to access jwt guard
// route: /account
@UseGuards(JWTGuard)
@Controller('account')
export class AccountController {
    // create constructor
    // access user service data
    constructor(private accountService: AccountService) {}

    // route: /account/deactivate
    @Delete('deactivate')
    accountDeactivate() {}

    // route: /account/login
    @HttpCode(HttpStatus.OK)
    @Post('login')
    accountLogin(@Body() data: AccountDTO) {
        return this.accountService.login(data);
    }

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
