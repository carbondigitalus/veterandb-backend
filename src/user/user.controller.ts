// NPM Modules
import { Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { User } from './../database';

// Custom Modules
import { GetUserData, JWTGuard } from './../utils';

// setup all subsequent controller methods to access jwt guard
// create controller with /users endpoint
// create user controller class
@UseGuards(JWTGuard)
@Controller('users')
export class UserController {
    // create constructor
    // access user service data
    constructor() {}

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
    usersGetOne(@GetUserData() user: User) {
        return user;
    }
}
