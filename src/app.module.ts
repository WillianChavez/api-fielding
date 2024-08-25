/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { SongModule } from './song/song.module';
import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { ResourceModule } from './resource/resource.module';
import { AuthModule } from './shared/auth/auth.module';

@Module({
  imports: [
    SharedModule,
    SongModule,
    AuthModule,
    WorkspaceModule,
    UserModule,
    ResourceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
