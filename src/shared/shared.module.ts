import { Module } from '@nestjs/common';
import { EnvModule } from './config/config.module';

@Module({
  imports: [EnvModule],
})
export class SharedModule {}
