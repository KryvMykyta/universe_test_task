import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/models/prismadb/prisma.service';
import { DataCollectorService } from '../dataCollector/dataCollector.service';
import { MailService } from '../mailer/mailer.service';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly dataCollector: DataCollectorService,
    private readonly mailService: MailService,
    private readonly prisma: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async dailyExchangeRateEmails() {
    const exchangeRate = await this.dataCollector.getLastRate();
    const activeSubscriptions = await this.prisma.subscription.findMany({
      where: {
        deletedAt: null,
      },
    });
    const emails = activeSubscriptions.map(
      (subscription) => subscription.email,
    );
    await this.mailService.bulkSendEmail(
      emails,
      'Daily exchange rate for BTC/USD',
      `New exchange rate: ${exchangeRate}`,
    );
    await this.prisma.rate.create({
      data: { rate: exchangeRate },
    });
  }

  @Cron(CronExpression.EVERY_HOUR)
  async hourlyCheckExchangeRate() {
    const exchangeRate = await this.dataCollector.getLastRate();
    const lastRateRecord = await this.prisma.rate.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (!exchangeRate || !lastRateRecord) return;
    const lastRecordedRate = lastRateRecord.rate;
    const increasedBy = exchangeRate / lastRecordedRate;
    console.log(increasedBy);
    if (Math.abs(1 - increasedBy) > 0.05) {
      const activeSubscriptions = await this.prisma.subscription.findMany({
        where: { status: 'SUBSCRIBED' },
      });
      const emails = activeSubscriptions.map(
        (subscription) => subscription.email,
      );
      await this.mailService.bulkSendEmail(
        emails,
        'Exchange rate changed',
        `New exchange rate: ${exchangeRate}`,
      );
      await this.prisma.rate.create({
        data: { rate: exchangeRate },
      });
    }
  }
}
