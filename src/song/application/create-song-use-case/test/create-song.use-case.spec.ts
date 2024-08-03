import { Test, TestingModule } from '@nestjs/testing';
import { CreateSongUseCase } from '../create-song-use-case';
import { SongRepository } from './../../../domain/repositories/song.repository';
import { SongRepositoryMock } from './song.repository.mock';
import { Song } from './../../../domain/entities/song.entity';

describe('CreateSongUseCase', () => {
  let createSongUseCase: CreateSongUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSongUseCase,
        {
          provide: SongRepository,
          useClass: SongRepositoryMock,
        },
      ],
    }).compile();

    createSongUseCase = module.get<CreateSongUseCase>(CreateSongUseCase);
  });

  it('should create a song', async () => {
    const song = Song.create({
      name: 'song name',
      artist: 'song artist',
      album: 'song album',
    });

    const result = await createSongUseCase.run(song.toValue());

    expect(result.song.name).toBe('song name');
  });
});
