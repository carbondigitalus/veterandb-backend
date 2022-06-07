// NPM Modules
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// create get user function
export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        // create request
        // use http request
        const request: Express.Request = ctx.switchToHttp().getRequest();
        // if data is found
        if (data) {
            // return user with data variable
            return request[data];
        }
        // otherwise, return the full user
        return request;
    }
);
