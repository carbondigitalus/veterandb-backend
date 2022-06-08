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

    // get user formatted as user
        return user;
    }
}
