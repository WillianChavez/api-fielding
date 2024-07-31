import { Controller, Get, Param } from '@nestjs/common';
import { SONG_ROUTE } from '../../routes/song.route';
import { FindSongUseCase } from 'src/song/application/find-song-use-case/find-song-use-case';
import { FindSongHttpDto } from './find-song.http.dto';
import { PrimitiveSong } from 'src/song/domain/entities/song.entity';

@Controller(SONG_ROUTE)
export class FindSongController {
  constructor(private readonly findSongUseCase: FindSongUseCase) {}

  @Get(':id')
  async run(@Param() findSongDto: FindSongHttpDto): Promise<PrimitiveSong> {
    return this.findSongUseCase.run(findSongDto);
  }
}
