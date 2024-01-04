import { Subscription } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrometheusService } from '../prometheus/prometheus.service';
import { SubscriptionDao } from '../dao/subscription/subscription.dao';

@Injectable()
export class EmailsService {
  constructor(
    private prometheusService: PrometheusService,
    private subscriptionDao: SubscriptionDao,
  ) {}

  async getAllEmails(): Promise<Subscription[]> {
    const subscriptions = await this.subscriptionDao.getAllSubscriptions();
    return subscriptions;
  }

  async subscribeEmail(email: string): Promise<Subscription | null> {
    const subscribedEmail = await this.subscriptionDao.subscribeEmail(email);
    if (subscribedEmail) this.prometheusService.incrementSubscribeCount();
    return subscribedEmail;
  }

  async unsubscribeEmail(email: string): Promise<Subscription | null> {
    const unsubscribeResult =
      await this.subscriptionDao.unsubscribeEmail(email);
    if (unsubscribeResult) this.prometheusService.incrementUnsubscribeCount();
    return unsubscribeResult;
  }
}
