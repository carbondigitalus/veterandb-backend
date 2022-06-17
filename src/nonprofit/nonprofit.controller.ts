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
import { JWTGuard } from '../utils/guards';

@UseGuards(JWTGuard)
@Controller('nonprofit')
export class NonProfitController {
    constructor() {}

    // route: /nonprofit
    @Post()
    nonprofitCreateOne() {}

    // route: /nonprofit
    @Get()
    nonprofitReadAll() {}

    // route: /nonprofit/:id
    @Get(':id')
    nonprofitReadOne() {}

    // route: /nonprofit/:id
    @Patch(':id')
    nonprofitUpdateOne() {}

    // route: /nonprofit/:id
    @Delete(':id')
    nonprofitDeleteOne() {}
}
