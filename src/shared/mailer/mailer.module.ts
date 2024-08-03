import { Module } from '@nestjs/common';
import { MailerConfig } from './providers/mailer.provider';
import { EnvConfigService } from '../config/services/env-config.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './services/mailer.services';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: MailerConfig,
      inject: [EnvConfigService],
    }),
  ],
  providers: [MailerConfig, MailService],
  exports: [MailerModule, MailService],
})
export class MailerEmailModule {}
