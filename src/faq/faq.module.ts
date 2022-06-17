// NPM Module
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Custom Module
import { FAQ } from 'src/database';
import { FAQController } from './faq.controller';
import { FAQService } from './faq.service';

@Module({
    imports: [TypeOrmModule.forFeature([FAQ])],
    exports: [TypeOrmModule],
    controllers: [FAQController],
    providers: [FAQService]
})
export class FAQModule {}
