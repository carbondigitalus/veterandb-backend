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
@Controller('directory')
export class DirectoryController {
    constructor() {}

    // route: /directory
    @Post()
    directoryCreateOne() {}

    // route: /directory
    @Get()
    directoryReadAll() {}

    // route: /directory/:id
    @Get(':id')
    directoryReadOne() {}

    // route: /directory/:id
    @Patch(':id')
    directoryUpdateOne() {}

    // route: /directory/:id
    @Delete(':id')
    directoryDeleteOne() {}
}
