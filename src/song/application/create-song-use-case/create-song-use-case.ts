import { PrimitiveSong, Song } from 'src/song/domain/entities/song.entity';
import { CreateSongDto } from './create-song.dto';
import { SongRepository } from 'src/song/domain/repositories/song.repository';
import { Injectable } from 'src/shared/dependencies/injectable';
import { SongAlreadyExistException } from 'src/song/domain/exceptions/song-already.exist.exception';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class CreateSongUseCase {
  constructor(
    private readonly songRepository: SongRepository,
    private readonly mailerService: MailerService,
  ) {}

  async run(createSongDto: CreateSongDto): Promise<{ song: PrimitiveSong }> {
    const songExists = await this.songRepository.findByName(createSongDto.name);

    if (songExists) {
      throw new SongAlreadyExistException();
    }
    const song = Song.create(createSongDto);
    await this.songRepository.create(song);
    await this.mailerService.sendMail({
      to: 'test@gmail.com',
      subject: 'Song created',
      template: './welcomE',
      context: song.toValue(),
    });

    return { song: song.toValue() };
  }
}
