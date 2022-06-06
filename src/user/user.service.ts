// NPM Modules
import { Injectable } from '@nestjs/common';

// Custom Modules
import { EditUserData } from './data';
import { PrismaService } from '../prisma/prisma.service';

// create injectable user service
@Injectable()
export class UserService {
    // import prisma variable with prisma service handled
    constructor(private prisma: PrismaService) {}

    // edit user method
    async editUser(userId: number, data: EditUserData) {
        // capture user
        const user = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...data
            }
        });
        // delete user hash before returning data
        delete user.hash;
        return user;
    }
}
