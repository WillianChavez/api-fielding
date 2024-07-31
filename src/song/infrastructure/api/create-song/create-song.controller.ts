import { Body, Controller, Post } from '@nestjs/common';
import { CreateSongUseCase } from 'src/song/application/create-song-use-case/create-song-use-case';
import { CreateSongHttpDto } from './create-song-http.dto';

@Controller('songs')
export class CreateSongController {
  constructor(private readonly createSongUseCase: CreateSongUseCase) {}

  @Post()
  async run(@Body() createSongDto: CreateSongHttpDto) {
    await this.createSongUseCase.run(createSongDto);
  }
}
