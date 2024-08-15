/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { SongModule } from './song/song.module';
import { AuthModule } from './auth/auth.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { ResourceModule } from './resource/resource.module';

@Module({
  imports: [SharedModule, SongModule, AuthModule, WorkspaceModule, ResourceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
