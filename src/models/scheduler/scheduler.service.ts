import { SubscriptionDao } from '../dao/subscription/subscription.dao';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DataCollectorService } from '../dataCollector/dataCollector.service';
import { MailService } from '../mailer/mailer.service';
import { RateDao } from '../dao/rate/rate.dao';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly dataCollector: DataCollectorService,
    private readonly mailService: MailService,
    private readonly subscriptionDao: SubscriptionDao,
    private readonly rateDao: RateDao,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async dailyExchangeRateEmails() {
    const exchangeRate = await this.dataCollector.getLastRate();
    const activeSubscriptions =
      await this.subscriptionDao.getActiveSubscriptions();
    const emails = activeSubscriptions.map(
      (subscription) => subscription.email,
    );
    await this.mailService.bulkSendEmail(
      emails,
      'Daily exchange rate for BTC/USD',
      `New exchange rate: ${exchangeRate}`,
    );
    await this.rateDao.createRateRecord({ rate: exchangeRate });
  }

  @Cron(CronExpression.EVERY_HOUR)
  async hourlyCheckExchangeRate() {
    const exchangeRate = await this.dataCollector.getLastRate();
    const lastRateRecord = await this.rateDao.getLastRateRecord();
    if (!exchangeRate || !lastRateRecord) return;
    const lastRecordedRate = lastRateRecord.rate;
    const increasedBy = exchangeRate / lastRecordedRate;
    if (Math.abs(1 - increasedBy) > 0.05) {
      const activeSubscriptions =
        await this.subscriptionDao.getActiveSubscriptions();
      const emails = activeSubscriptions.map(
        (subscription) => subscription.email,
      );
      await this.mailService.bulkSendEmail(
        emails,
        'Exchange rate changed',
        `New exchange rate: ${exchangeRate}`,
      );
      await this.rateDao.createRateRecord({ rate: exchangeRate });
    }
  }
}
