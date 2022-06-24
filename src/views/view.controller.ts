// NPM Modules
import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Render,
    Res
} from '@nestjs/common';

// Custom Modules
import { ViewService } from './view.service';

// route: /
@Controller()
export class ViewController {
    // create constructor
    constructor(private viewService: ViewService) {}

    // route: /login
    @HttpCode(HttpStatus.OK)
    @Get('login')
    @Render('login')
    viewLogin() {}
}
