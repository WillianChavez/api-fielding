import { Song } from './../../../domain/entities/song.entity';
import { SongRepository } from './../../../domain/repositories/song.repository';

export class SongRepositoryMock extends SongRepository {
  private songs: Song[] = [];
  async create(song: Song): Promise<Song> {
    return song;
  }
  async update(id: string, song: Song): Promise<Song> {
    throw new Error('Method not implemented.' + id + song);
  }
  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.' + id);
  }
  findAll(): Promise<Song[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<Song> {
    throw new Error('Method not implemented.' + id);
  }
  async findByName(name: string): Promise<Song> {
    return this.songs.find((song) => song.toValue().name === name);
  }
}
