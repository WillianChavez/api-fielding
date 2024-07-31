import { PrimitiveSong, Song } from 'src/song/domain/entities/song.entity';
import { CreateSongDto } from './create-song.dto';
import { SongRepository } from 'src/song/domain/repositories/song.repository';
import { Injectable } from 'src/shared/dependencies/injectable';

@Injectable()
export class CreateSongUseCase {
  constructor(private readonly songRepository: SongRepository) {}

  async run(createSongDto: CreateSongDto): Promise<{ song: PrimitiveSong }> {
    const song = Song.create(createSongDto);
    await this.songRepository.create(song);
    return { song: song.toValue() };
  }
}
