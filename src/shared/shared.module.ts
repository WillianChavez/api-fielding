import { Module } from '@nestjs/common';
import { EnvModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [EnvModule, DatabaseModule],
})
export class SharedModule {}
