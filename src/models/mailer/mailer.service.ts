import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(
    reciever: string,
    subject: string,
    text: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: reciever,
      subject,
      text,
    });
  }
}
