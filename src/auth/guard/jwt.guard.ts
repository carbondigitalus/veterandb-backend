// NPM Modules
import { AuthGuard } from '@nestjs/passport';

// create jwt guard class
export class JWTGuard extends AuthGuard('jwt-guard') {
    constructor() {
        super();
    }
}
