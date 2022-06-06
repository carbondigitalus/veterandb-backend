// NPM Modules
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

// Custom Modules
import { GetUser } from '../auth/decorator';
import { JWTGuard } from '../auth/guard';
import { EditUserData } from './data';
import { UserService } from './user.service';

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

    // create patch request for /users
    // edit user id and user data
    @Patch()
    editUser(@GetUser('id') userId: number, @Body() data: EditUserData) {
        return this.userService.editUser(userId, data);
    }
}
