import { DataCollectorService } from '../dataCollector/dataCollector.service';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/models/prismadb/prisma.service';
import { MailService } from '../mailer/mailer.service';

@Injectable()
export class RateService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    private dataCollector: DataCollectorService,
  ) {}

  async getRate(): Promise<number> {
    const rate = await this.dataCollector.getLastRate();
    return rate;
  }

  async sendEmails() {
    const subscriptions = await this.prisma.subscription.findMany({
      where: { status: 'SUBSCRIBED' },
    });
    const exchangeRate = await this.dataCollector.getLastRate();
    const subject = `Rates for ${new Date().toLocaleDateString()})}`;
    const text = `New rate: ${exchangeRate}`;
    const activeEmails = subscriptions.map(
      (subscription) => subscription.email,
    );
    await this.mailService.bulkSendEmail(activeEmails, subject, text);
    await this.prisma.rate.create({
      data: { rate: exchangeRate },
    });
    return { message: text, activeEmails };
  }
}
