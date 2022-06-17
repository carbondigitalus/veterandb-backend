// NPM Module
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Custom Module
import { NonProfit } from 'src/database';
import { NonProfitService } from './nonprofit.service';
import { NonProfitController } from './nonprofit.controller';

@Module({
    imports: [TypeOrmModule.forFeature([NonProfit])],
    exports: [TypeOrmModule],
    controllers: [NonProfitController],
    providers: [NonProfitService]
})
export class NonProfitModule {}
