import { InjectModel } from '@nestjs/sequelize';
import { SongRepository } from 'src/song/domain/repositories/song.repository';
import { Song } from 'src/song/domain/entities/song.entity';
import { Injectable } from 'src/shared/dependencies/injectable';
import SongModel from '../models/song.model';

@Injectable()
export class RelationalSongRepository extends SongRepository {
  constructor(@InjectModel(SongModel) private songModel: typeof SongModel) {
    super();
  }

  async findByName(name: string): Promise<Song> {
    const songRes = await this.songModel.findOne({ where: { name } });
    const song: Song = new Song({
      id: songRes.id,
      name: songRes.name,
      artist: songRes.artist,
      album: songRes.album,
    });

    return song;
  }

  async create(song: Song): Promise<Song> {
    await this.songModel.create(song.toValue());
    return song;
  }

  async findAll(): Promise<Song[]> {
    const songsRes = await this.songModel.findAll();
    const songs: Song[] = songsRes.map(
      (song) =>
        new Song({
          id: song.id,
          name: song.name,
          artist: song.artist,
          album: song.album,
        }),
    );

    return songs;
  }

  async findOne(id: string): Promise<Song> {
    const songRes = await this.songModel.findByPk(id);

    return new Song({
      id: songRes.id,
      name: songRes.name,
      artist: songRes.artist,
      album: songRes.album,
    });
  }

  async update(id: string, song: Song): Promise<Song> {
    const { name, album, artist } = song.toValue();
    await this.songModel.update(
      {
        name,
        artist,
        album,
      },
      { where: { id } },
    );

    return song;
  }

  async delete(id: string): Promise<void> {
    await this.songModel.destroy({ where: { id } });
  }
}
