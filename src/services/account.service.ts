// NPM Modules
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm';

// Custom Modules
import { AccountDataModel } from '../utils';
import { User } from 'src/database';

// create injectable auth service
@Injectable()
export class AccountService {
    // create constructor
    // import prisma service, jwt service and cofig service
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwt: JwtService
    ) {}

    // create login method
    async login(data: AccountDataModel) {
        // find the user by email
        const user = await this.userData.user.findUnique({
            where: {
                email: data.email
            }
        });
        // if user does not exist throw exception
        if (!user) throw new ForbiddenException('Credentials incorrect');

        // compare password
        const pwMatches = await argon.verify(user.hash, data.password);
        // if password incorrect throw exception
        if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
        // return signed token if login successful
        return this.signToken(user.id, user.email);
    }

    // create register method
    async register(data: AccountDataModel) {
        // generate the password hash
        const hash = await argon.hash(data.password);
        // save the new user in the db
        try {
            // create user
            const user = await this.userData.user.create({
                data: {
                    email: data.email,
                    hash
                }
            });
            // return signed token after user creation
            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error instanceof ForbiddenException) {
                throw new ForbiddenException('Credentials taken');
            }
            throw error;
        }
    }

    // create sign token method
    async signToken(
        userId: number,
        email: string
    ): Promise<{ access_token: string }> {
        // capture jwt payload from user details
        const payload = {
            sub: userId,
            email
        };
        // get jwt secret from env variable
        const secret = process.env.JWT_SECRET;
        // create jwt token
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret
        });
        // return access token
        return {
            access_token: token
        };
    }
}
