export abstract class MailerService {
  abstract sendMail({
    to,
    subject,
    template,
    context,
  }: {
    to: string;
    subject: string;
    template: string;
    context: any;
  }): Promise<void>;
}
