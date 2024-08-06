import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { SongModule } from './song/song.module';
import { WorkspaceModule } from './workspace/workspace.module';

@Module({
  imports: [SharedModule, SongModule, WorkspaceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
