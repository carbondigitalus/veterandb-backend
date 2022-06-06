import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './data';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

}
