// NPM Modules
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// create jwt guard class
@Injectable()
export class JWTGuard extends AuthGuard('jwt-validation') {
    constructor() {
        super();
    }
}
