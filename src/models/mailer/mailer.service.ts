import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { PrometheusService } from '../prometheus/prometheus.service';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly prometheus: PrometheusService,
  ) {}

  async sendEmail(
    reciever: string,
    subject: string,
    text: string,
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: reciever,
        subject,
        text,
      });
      this.prometheus.incrementSendEmailSuccessCount();
    } catch (err) {
      this.prometheus.incrementSendEmailErrorCount();
    }
  }

  async bulkSendEmail(recievers: string[], subject: string, text: string) {
    await Promise.all(
      recievers.map(async (reciever) => {
        await this.sendEmail(reciever, subject, text);
      }),
    );
  }
}
