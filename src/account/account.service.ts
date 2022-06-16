// NPM Modules
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm';

// Custom Modules
import { User } from 'src/database';
import { AccountLoginDTO } from './dto/login.dto';
import { AccountRegisterDTO } from './dto/register.dto';

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
    async login(data: AccountLoginDTO) {
        // find the user by email
        const user = await this.userRepository.findOne({
            where: {
                email: data.email
            }
        });
        // if user does not exist throw exception
        if (!user) throw new ForbiddenException('Unable to find user.');

        // compare password
        const passwordValidateSuccess = await argon.verify(
            user.password,
            data.password
        );
        // if password incorrect throw exception
        if (!passwordValidateSuccess)
            throw new ForbiddenException('Email or password incorrect.');
        // return signed token if login successful
        return this.signToken(user.id, user.email);
    }

    // create register method

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
            expiresIn: process.env.JWT_EXPIRES_IN,
            secret: secret
        });
        // return access token
        return {
            access_token: token
        };
    }
}
