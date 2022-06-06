import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthData } from './data';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async register(data: AuthData) {
        // generate the password hash
        const hash = await argon.hash(data.password);
        // save the new user in the db
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: data.email,
                    hash
                }
            });

            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }

    async login(data: AuthData) {
        // find the user by email
        const user = await this.prisma.user.findUnique({
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
        return this.signToken(user.id, user.email);
    }

}
