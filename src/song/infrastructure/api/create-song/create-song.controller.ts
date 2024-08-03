import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateSongUseCase } from 'src/song/application/create-song-use-case/create-song-use-case';
import { CreateSongHttpDto } from './create-song-http.dto';
import { SongAlreadyExistException } from 'src/song/domain/exceptions/song-already.exist.exception';
import { SONG_ROUTE } from '../../routes/song.route';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(SONG_ROUTE)
@Controller(SONG_ROUTE)
export class CreateSongController {
  constructor(private readonly createSongUseCase: CreateSongUseCase) {}

  @Post()
  async run(@Body() createSongDto: CreateSongHttpDto) {
    try {
      const song = await this.createSongUseCase.run(createSongDto);
      return song;
    } catch (error) {
      if (error instanceof SongAlreadyExistException) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(error);
    }
  }
}
