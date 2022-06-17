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
@Controller('faq')
export class FAQController {
    constructor() {}

    // route: /faq
    @Post()
    faqCreateOne() {}

    // route: /faq
    @Get()
    faqReadAll() {}

    // route: /faq/:id
    @Get(':id')
    faqReadOne() {}

    // route: /faq/:id
    @Patch(':id')
    faqUpdateOne() {}

    // route: /faq/:id
    @Delete(':id')
    faqDeleteOne() {}
}
