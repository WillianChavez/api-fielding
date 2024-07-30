import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { SongModule } from './song/song.module';

@Module({
  imports: [SharedModule, SongModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
