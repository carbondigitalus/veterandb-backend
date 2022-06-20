// NPM Modules
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm';

// Custom Modules
import { User } from 'src/database';
import {
    AccountActivateDTO,
    AccountDeactivateDTO,
    AccountLoginDTO,
    AccountRegisterDTO
} from './dto';

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

    // create activate method
    async activate(data: AccountActivateDTO) {
        // find user
        const user = await this.userRepository.findOne({
            where: {
                id: data.id
            }
        });

        // modify user data before update
        const updatedUser = await this.userRepository.preload({
            id: user.id,
            isActiveAccount: true
        });

        // set isActiveAccount to false
        return this.userRepository.save(updatedUser);
    }

    // create deactivate method
    async deactivate(data: AccountDeactivateDTO) {
        // find user
        const user = await this.userRepository.findOne({
            where: {
                id: data.id
            }
        });

        // modify user data before update
        const updatedUser = await this.userRepository.preload({
            id: user.id,
            isActiveAccount: false
        });

        // set isActiveAccount to false
        return this.userRepository.save(updatedUser);
    }

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
    async register(data: AccountRegisterDTO) {
        // save the new user in the db
        try {
            // generate the password hash
            const hashedPassword = await argon.hash(data.password);
            // create user
            const user = await this.userRepository.create({
                ...data,
                password: hashedPassword,
                passwordConfirm: hashedPassword
            });

            await this.signToken(user.id, user.email);

            // return signed token after user creation
            return this.userRepository.save(user);
        } catch (error) {
            if (error instanceof ForbiddenException) {
                throw new ForbiddenException(
                    'User already exists. Please reset password.'
                );
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
            expiresIn: process.env.JWT_EXPIRES_IN,
            secret: secret
        });
        // return access token
        return {
            access_token: token
        };
    }
}
