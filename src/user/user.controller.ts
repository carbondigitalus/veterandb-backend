import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JWTGuard } from '../auth/guard';
import { EditUserDto } from './data';
import { UserService } from './user.service';

@UseGuards(JWTGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
}
