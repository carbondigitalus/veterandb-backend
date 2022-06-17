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
@Controller('review')
export class ReviewController {
    constructor() {}

    // route: /review
    @Post()
    reviewCreateOne() {}

    // route: /review
    @Get()
    reviewReadAll() {}

    // route: /review/:id
    @Get(':id')
    reviewReadOne() {}

    // route: /review/:id
    @Patch(':id')
    reviewUpdateOne() {}

    // route: /review/:id
    @Delete(':id')
    reviewDeleteOne() {}
}
