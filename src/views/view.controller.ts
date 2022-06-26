// NPM Modules
import { Controller, Get, HttpCode, HttpStatus, Render } from '@nestjs/common';

// Custom Modules
import { ViewService } from './view.service';

// route: /
@Controller()
export class ViewController {
    // create constructor
    constructor(private viewService: ViewService) {}

    // route: /
    @HttpCode(HttpStatus.OK)
    @Get('/')
    @Render('dashboard')
    viewDashboard() {}

    // route: /login
    @HttpCode(HttpStatus.OK)
    @Get('login')
    @Render('login')
    viewLogin() {}

    // route: /register
    @HttpCode(HttpStatus.OK)
    @Get('register')
    @Render('register')
    viewRegister() {}
}
