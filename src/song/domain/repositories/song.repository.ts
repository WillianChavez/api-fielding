import { Song } from '../entities/song.entity';

export abstract class SongRepository {
  abstract create(song: Song): Promise<Song>;
  abstract update(id: string, song: Song): Promise<Song>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<Song[]>;
  abstract findOne(id: string): Promise<Song>;
  abstract findByName(name: string): Promise<Song>;
}
