// NPM Module
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Custom Module
import { Directory } from 'src/database';
import { DirectoryController } from './directory.controller';
import { DirectoryService } from './directory.service';

@Module({
    imports: [TypeOrmModule.forFeature([Directory])],
    exports: [TypeOrmModule],
    controllers: [DirectoryController],
    providers: [DirectoryService]
})
export class DirectoryModule {}
