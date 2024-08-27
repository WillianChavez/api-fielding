/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { SongModule } from './song/song.module';
import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';

@Module({
  imports: [SharedModule, SongModule, UserModule, WorkspaceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
