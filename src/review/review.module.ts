// NPM Module
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Custom Module
import { Review } from 'src/database';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
    imports: [TypeOrmModule.forFeature([Review])],
    exports: [TypeOrmModule],
    controllers: [ReviewController],
    providers: [ReviewService]
})
export class ReviewModule {}
