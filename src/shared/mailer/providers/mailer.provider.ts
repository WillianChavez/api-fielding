import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EnvConfigService } from 'src/shared/config/services/env-config.service';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class MailerConfig implements MailerOptionsFactory {
  constructor(private readonly envConfigService: EnvConfigService) {}
  createMailerOptions(): Promise<MailerOptions> | MailerOptions {
    return {
      ...this.envConfigService.vars.mailer,
      template: {
        dir: join(__dirname, '../../../.././assets/email/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
