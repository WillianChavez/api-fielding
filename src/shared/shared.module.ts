import { Module } from '@nestjs/common';
import { EnvModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { MailerEmailModule } from './mailer/mailer.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EnvModule, DatabaseModule, AuthModule, MailerEmailModule],
})
export class SharedModule {}
