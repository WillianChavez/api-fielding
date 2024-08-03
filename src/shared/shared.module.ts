import { Module } from '@nestjs/common';
import { EnvModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { MailerEmailModule } from './mailer/mailer.module';

@Module({
  imports: [EnvModule, DatabaseModule, MailerEmailModule],
})
export class SharedModule {}
