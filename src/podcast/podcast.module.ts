// NPM Module
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Custom Module
import { Podcast } from 'src/database';
import { PodcastController } from './podcast.controller';
import { PodcastService } from './podcast.service';

@Module({
    imports: [TypeOrmModule.forFeature([Podcast])],
    exports: [TypeOrmModule],
    controllers: [PodcastController],
    providers: [PodcastService]
})
export class PodcastModule {}
