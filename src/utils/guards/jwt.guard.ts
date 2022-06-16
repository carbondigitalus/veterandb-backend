// NPM Modules
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// create jwt guard class
export class JWTGuard extends AuthGuard('jwt-guard') {
@Injectable()
    constructor() {
        super();
    }
}
