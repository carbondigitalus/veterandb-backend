// NPM Modules
import {
    Body,
    Controller,
    Delete,
    HttpCode,
    HttpStatus,
    Patch,
    Post,
    Request,
    Res,
    UseGuards
} from '@nestjs/common';

// Custom Modules
import { AccountService } from './account.service';
import { JWTGuard } from './../utils/guards';
import { GetUserData } from 'src/utils/decorators';
import {
    AccountActivateDTO,
    AccountDeactivateDTO,
    AccountLoginDTO,
    AccountRegisterDTO
} from './dto';
import { SetCookies } from 'src/utils/decorators';

// setup all subsequent controller methods to access jwt guard
// route: /account
@Controller('account')
export class AccountController {
    // create constructor
    // access user service data
    constructor(private accountService: AccountService) {}

    // route: /account/deactivate
    @UseGuards(JWTGuard)
    @Post('activate')
    accountActivate(@GetUserData() user: AccountActivateDTO) {
        return this.accountService.activate(user);
    }

    // route: /account/deactivate
    @UseGuards(JWTGuard)
    @Delete('deactivate')
    accountDeactivate(@GetUserData() user: AccountDeactivateDTO) {
        return this.accountService.deactivate(user);
    }

    // route: /account/login
    @HttpCode(HttpStatus.OK)
    @Post('login')
    accountLogin(@Body() data: AccountLoginDTO, @Request() req) {
        return this.accountService.login(data, req);
    }

    // route: /account/logout
    @UseGuards(JWTGuard)
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
    accountRegister(@Body() data: AccountRegisterDTO) {
        return this.accountService.register(data);
    }

    // route: /account/update-profile
    @UseGuards(JWTGuard)
    @Patch('update-profile')
    accountUpdateProfile() {}

    // route: /account/update-settings
    @UseGuards(JWTGuard)
    @Patch('update-settings')
    accountUpdateSettings() {}
}
