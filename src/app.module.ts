/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { SongModule } from './song/song.module';
import { AuthModule } from './auth/auth.module';
import { WorkspaceModule } from './workspace/workspace.module';

@Module({
  imports: [SharedModule, SongModule, AuthModule, WorkspaceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
