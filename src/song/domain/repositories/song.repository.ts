import { Song } from '../entities/song.entity';

export abstract class SongRepository {
  abstract create(song: Song): Promise<Song>;
  abstract update(song: Song): Promise<Song>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<Song[]>;
  abstract findOne(id: string): Promise<Song>;
}
