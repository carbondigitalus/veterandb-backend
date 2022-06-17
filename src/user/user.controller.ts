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
import { JWTGuard } from './../utils/guards';
import { GetUserData } from './../utils/decorators';

// setup all subsequent controller methods to access jwt guard
// create controller with /users endpoint
// create user controller class
@UseGuards(JWTGuard)
@Controller('user')
export class UserController {
    // create constructor
    // access user service data
    constructor() {}

    // route: /user
    @Post()
    userCreateOne() {}

    // route: /user
    @Get()
    userReadAll() {}

    // get user formatted as user
    // route: /user/:id
    @Get(':id')
    userReadOne(@GetUserData() user: User) {
        return user;
    }

    // route: /user/:id
    @Patch(':id')
    userUpdateOne() {}

    // route: /user/:id
    @Delete(':id')
    userDeleteOne() {}
}
