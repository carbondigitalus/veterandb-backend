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
@Controller('podcast')
export class PodcastController {
    constructor() {}

    // route: /podcast
    @Post()
    podcastCreateOne() {}

    // route: /podcast
    @Get()
    podcastReadAll() {}

    // route: /podcast/:id
    @Get(':id')
    podcastReadOne() {}

    // route: /podcast/:id
    @Patch(':id')
    podcastUpdateOne() {}

    // route: /podcast/:id
    @Delete(':id')
    podcastDeleteOne() {}
}
