import { CoinMarketService } from './../coinMarket/coinMarket.service';
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
    private coinMarketService: CoinMarketService,
  ) {}

  async getLastRate(): Promise<Rate> {
    const btcUsd = await this.coinMarketService.getBitcoinUsd();
    const usdUah = await this.coinMarketService.getUsdUah();
    const btcUah = btcUsd * usdUah;
    return { rate: btcUah };
  }

  async sendEmails() {
    const subscriptions = await this.prisma.subscription.findMany();
    const rateData = await this.getLastRate();
    const { rate: exchangeRate } = rateData;
    const subject = `Rates for ${new Date().toLocaleDateString()})}`;
    const text = rateData ? `New rate: ${exchangeRate}` : 'No rates yet';
    const activeEmails = subscriptions
      .filter((subscription) => subscription.status === 'SUBSCRIBED')
      .map((subscription) => subscription.email);
    this.prometheusService.setExchangeRate(exchangeRate);
    await Promise.all(
      activeEmails.map(async (email) => {
        try {
          this.prometheusService.incrementSendEmailSuccessCount();
          await this.mailService.sendEmail(email, subject, text);
        } catch (err) {
          this.prometheusService.incrementSendEmailErrorCount();
        }
      }),
    );
    return { message: text, activeEmails };
  }
}
