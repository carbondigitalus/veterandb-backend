// NPM Modules
import { Module } from '@nestjs/common';

// Custom Modules
import { ViewService } from './view.service';
import { ViewController } from './view.controller';

@Module({
    imports: [],
    exports: [],
    controllers: [ViewController],
    providers: [ViewService]
})
export class ViewModule {}
