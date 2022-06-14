// NPM Modules
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

// Custom Modules
import { User } from 'src/database';

// create injectable jwt strategy class
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt-strategy') {
    // create constructor
    // import config service and prisma service data
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        });
    }

    // create validate method
    // use jwt payload, user data and email
    async validate(payload: { sub: number; email: string }) {
        // find user
        const user = await this.userData.user.findUnique({
            where: {
                id: payload.sub
            }
        });
        // delete user hash
        // return user
        delete user.hash;
        return user;
    }
}
