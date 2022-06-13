// NPM Modules
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Custom Modules

// create injectable jwt strategy class
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt-strategy') {
    // create constructor
    // import config service and prisma service data
    constructor(private userData: any) {
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
