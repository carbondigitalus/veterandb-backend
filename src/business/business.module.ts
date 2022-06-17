// NPM Module
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Custom Module
import Business from 'src/database/business.entity';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';

@Module({
    imports: [TypeOrmModule.forFeature([Business])],
    exports: [TypeOrmModule],
    controllers: [BusinessController],
    providers: [BusinessService]
})
export class BusinessModule {}
