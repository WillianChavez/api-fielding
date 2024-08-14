import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from 'src/shared/dependencies/injectable';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMail(data: {
    context: any;
    subject: string;
    template: string;
    to: string;
  }): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: data.to,
        subject: data.subject,
        template: data.template,
        context: data.context,
      });
    } catch (error) {
      throw new Error('Error sending email' + error);
    }
  }
}
