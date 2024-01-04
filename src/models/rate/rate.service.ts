import { DataCollectorService } from '../dataCollector/dataCollector.service';
import { Injectable } from '@nestjs/common';
import { MailService } from '../mailer/mailer.service';
import { SubscriptionDao } from '../dao/subscription/subscription.dao';
import { RateDao } from '../dao/rate/rate.dao';

@Injectable()
export class RateService {
  constructor(
    private mailService: MailService,
    private dataCollector: DataCollectorService,
    private subscriptionDao: SubscriptionDao,
    private rateDao: RateDao,
  ) {}

  async getRate(): Promise<number> {
    const rate = await this.dataCollector.getLastRate();
    return rate;
  }

  async sendEmails() {
    const subscriptions = await this.subscriptionDao.getActiveSubscriptions();
    const exchangeRate = await this.dataCollector.getLastRate();
    const subject = `Rates for ${new Date().toLocaleDateString()})}`;
    const text = `New rate: ${exchangeRate}`;
    const activeEmails = subscriptions.map(
      (subscription) => subscription.email,
    );
    await this.mailService.bulkSendEmail(activeEmails, subject, text);
    await this.rateDao.createRateRecord({ rate: exchangeRate });
    return { message: text, activeEmails };
  }
}
