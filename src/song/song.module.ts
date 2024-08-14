/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import SongModel from './infrastructure/models/song.model';
import { CreateSongController } from './infrastructure/api/create-song/create-song.controller';
import { CreateSongUseCase } from './application/create-song-use-case/create-song-use-case';
import { RelationalSongRepository } from './infrastructure/repositories/relational.song.repository';
import { SongRepository } from './domain/repositories/song.repository';
import { FindSongController } from './infrastructure/api/find-song/find-song.controller';
import { FindSongUseCase } from './application/find-song-use-case/find-song-use-case';
import { MailService } from 'src/shared/mailer/services/mailer.services';
import { MailerService } from './domain/services/mailer.service';

@Module({
  controllers: [CreateSongController, FindSongController],
  imports: [SequelizeModule.forFeature([SongModel])],
  providers: [
    CreateSongUseCase,
    FindSongUseCase,
    RelationalSongRepository,
    MailService,
    {
      provide: SongRepository,
      useExisting: RelationalSongRepository,
    },
    {
      provide: MailerService,
      useClass: MailService,
    },
  ],
  exports: [CreateSongUseCase, FindSongUseCase],
})
export class SongModule {}
