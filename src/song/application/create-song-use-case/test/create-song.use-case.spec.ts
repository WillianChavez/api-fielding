import { Song } from './../../../domain/entities/song.entity';

describe('CreateSongUseCase', () => {
  it('should create a song', async () => {
    const song = Song.create({
      name: 'song name',
      artist: 'song artist',
      album: 'song album',
    });

    expect(song.toValue().name).toBe('song name');
  });
});
