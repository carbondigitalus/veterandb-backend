// NPM Modules
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Custom Modules
import { User } from 'src/database';

// create injectable user service
@Injectable()
export class UserService {
    // import prisma variable with prisma service handled
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    // edit user method
    // async editUser(userId: string, userRepository: User): Promise<User> {
    //     // capture user
    //     const user = await this.userRepository;

    //     const update({
    //         where: {
    //             id: userId
    //         },
    //         data: {
    //             ...data
    //         }
    //     });
    //     // delete user hash before returning data
    //     delete user.hash;
    //     return user;
    // }
}
