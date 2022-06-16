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
import { AccountLoginDTO } from './dto/login.dto';
import { JWTGuard } from './../utils/guards';

// setup all subsequent controller methods to access jwt guard
// route: /account
@Controller('account')
export class AccountController {
    // create constructor
    // access user service data
    constructor(private accountService: AccountService) {}

    // route: /account/deactivate
    @UseGuards(JWTGuard)
    @Delete('deactivate')
    accountDeactivate() {}

    // route: /account/login
    @HttpCode(HttpStatus.OK)
    @Post('login')
    accountLogin(@Body() data: AccountLoginDTO) {
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
    @UseGuards(JWTGuard)
    @Patch('update-settings')
    accountUpdateSettings() {}
}
