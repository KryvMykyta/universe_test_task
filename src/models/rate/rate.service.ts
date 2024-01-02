import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Rate } from './rate.model';
import { MailService } from '../mailer/mailer.service';
import { PrometheusService } from '../prometheus/prometheus.service';

@Injectable()
export class RateService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    private prometheusService: PrometheusService,
  ) {}

  async getLastRate(): Promise<Rate> {
    const rate = await this.prisma.rate.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return rate;
  }

  async sendEmails() {
    this.prometheusService.setExchangeRate(28);
    // const subscriptions = await this.prisma.subscription.findMany();
    // const rateData = await this.getLastRate();
    // const { rate: exchangeRate } = rateData;
    // const subject = `Rates for ${new Date().toLocaleDateString()})}`;
    // const text = rateData ? `New rate: ${exchangeRate}` : 'No rates yet';
    // const activeEmails = subscriptions
    //   .filter((subscription) => subscription.status === 'SUBSCRIBED')
    //   .map((subscription) => subscription.email);
    // this.prometheusService.setExchangeRate(exchangeRate);
    // await Promise.all(
    //   activeEmails.map(async (email) => {
    //     try {
    //       console.log('success email');
    //       this.prometheusService.incrementSendEmailSuccessCount();
    //       await this.mailService.sendEmail(email, subject, text);
    //     } catch (err) {
    //       this.prometheusService.incrementSendEmailErrorCount();
    //     }
    //   }),
    // );
    // //registry save metrics
    // return { message: text, activeEmails };
  }
}
