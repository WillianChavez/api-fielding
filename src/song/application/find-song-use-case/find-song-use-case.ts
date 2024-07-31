import { PrimitiveSong, Song } from 'src/song/domain/entities/song.entity';
import { SongRepository } from 'src/song/domain/repositories/song.repository';
import { FindSongDto } from './Find-song.dto';
import { Injectable } from 'src/shared/dependencies/injectable';

@Injectable()
export class FindSongUseCase {
  constructor(private readonly songRepository: SongRepository) {}
  async run(dto: FindSongDto): Promise<PrimitiveSong> {
    const song: Song = await this.songRepository.findOne(dto.id);
    return song.toValue();
  }
}
