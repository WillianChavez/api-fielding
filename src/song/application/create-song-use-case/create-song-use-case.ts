import { PrimitiveSong, Song } from './../../domain/entities/song.entity';
import { CreateSongDto } from './create-song.dto';
import { SongRepository } from './../../domain/repositories/song.repository';
import { Injectable } from './../../../shared/dependencies/injectable';
import { SongAlreadyExistException } from './../../domain/exceptions/song-already.exist.exception';
import { MailerService } from './../../domain/services/mailer.service';
import { Transactional } from './../../../shared/dependencies/transactional';

@Injectable()
export class CreateSongUseCase {
  constructor(
    private readonly songRepository: SongRepository,
    private readonly mailerService: MailerService,
  ) {}

  @Transactional()
  async run(createSongDto: CreateSongDto): Promise<{ song: PrimitiveSong }> {
    const songExists = await this.songRepository.findByName(createSongDto.name);

    if (songExists) {
      throw new SongAlreadyExistException();
    }
    const song = Song.create(createSongDto);

    const songCreated: Song = await this.songRepository.create(song);

    await this.mailerService.sendMail({
      context: songCreated.toValue(),
      subject: 'New song created',
      template: 'welcome',
      to: 'test@mail.com',
    });

    return { song: songCreated.toValue() };
  }
}
