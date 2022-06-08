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


    // get user formatted as user
    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }

    // create put request for /users
    // edit user id and user data
    @Put()
    editUser(@GetUser('id') userId: number, @Body() data: EditUserData) {
        return this.userService.editUser(userId, data);
    }
}
