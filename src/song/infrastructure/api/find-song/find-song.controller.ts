import { Controller, Get, Param } from '@nestjs/common';
import { SONG_ROUTE } from '../../routes/song.route';
import { FindSongUseCase } from 'src/song/application/find-song-use-case/find-song-use-case';
import { FindSongHttpDto } from './find-song.http.dto';
import { PrimitiveSong } from 'src/song/domain/entities/song.entity';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@/shared/auth/decorators/roles.decorator';
import { Role } from '@/shared/auth/interface/role.enum';

@ApiTags(SONG_ROUTE)
@Controller(SONG_ROUTE)
export class FindSongController {
  constructor(private readonly findSongUseCase: FindSongUseCase) {}

  @Get(':id')
  @Roles([Role.Admin])
  async run(@Param() findSongDto: FindSongHttpDto): Promise<PrimitiveSong> {
    return this.findSongUseCase.run(findSongDto);
  }
}
