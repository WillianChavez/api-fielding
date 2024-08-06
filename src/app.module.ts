/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { SongModule } from './song/song.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SharedModule, SongModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
