import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import SongModel from './infrastructure/models/song.model';
import { CreateSongController } from './infrastructure/api/create-song/create-song.controller';
import { CreateSongUseCase } from './application/create-song-use-case/create-song-use-case';
import { RelationalSongRepository } from './infrastructure/repositories/relational.song.repository';
import { SongRepository } from './domain/repositories/song.repository';

@Module({
  controllers: [CreateSongController],
  imports: [SequelizeModule.forFeature([SongModel])],
  providers: [
    CreateSongUseCase,
    RelationalSongRepository,
    {
      provide: SongRepository,
      useExisting: RelationalSongRepository,
    },
  ],
  exports: [CreateSongUseCase, SequelizeModule],
})
export class SongModule {}
