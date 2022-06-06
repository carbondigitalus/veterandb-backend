// NPM Modules
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Custom Modules
import { PrismaService } from '../../prisma/prisma.service';

// create injectable jwt strategy class
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
    // create constructor
    // import config service and prisma service data
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET')
        });
    }

    // create validate method
    // use jwt payload, user data and email
    async validate(payload: { sub: number; email: string }) {
        // find user
        const user = await this.prisma.user.findUnique({
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
