// NPM Modules
import {
    Controller,
    Delete,
    Get,
    Patch,
    Post,
    UseGuards
} from '@nestjs/common';

// Custom Modules
import { JWTGuard } from './../utils/guards';

@UseGuards(JWTGuard)
@Controller('business')
export class BusinessController {
    // create constructor
    // access user service data
    constructor() {}

    // route: /business
    @Post()
    businessCreateOne() {}

    // route: /business
    @Get()
    businessReadAll() {}

    // route: /business/:id
    @Get(':id')
    businessReadOne() {}

    // route: /business/:id
    @Patch(':id')
    businessUpdateOne() {}

    // route: /business/:id
    @Delete(':id')
    businessDeleteOne() {}
}
