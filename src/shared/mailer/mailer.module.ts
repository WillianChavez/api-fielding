import { Module } from '@nestjs/common';
import { MailerConfig } from './providers/mailer.provider';
import { EnvConfigService } from '../config/services/env-config.service';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: MailerConfig,
      inject: [EnvConfigService],
    }),
  ],
  exports: [MailerModule],
})
export class MailerEmailModule {}
