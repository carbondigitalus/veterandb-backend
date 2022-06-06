import { AuthGuard } from '@nestjs/passport';

export class JWTGuard extends AuthGuard('jwt-guard') {
    constructor() {
        super();
    }
}
