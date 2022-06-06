// NPM Modules
import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

// Custom Modules
import { GetUser } from '../decorators';
import { JWTGuard } from '../guards';
import { EditUserData } from '../data';
import { UserService } from '../services';

// setup all subsequent controller methods to access jwt guard
// create controller with /users endpoint
// create user controller class
@UseGuards(JWTGuard)
@Controller('users')
export class UserController {
    // create constructor
    // access user service data
    constructor(private userService: UserService) {}

    // create get request for /users/me
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
