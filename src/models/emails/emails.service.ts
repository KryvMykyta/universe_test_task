import { Subscription } from '@prisma/client';
import { PrismaService } from '../prismadb/prisma.service';
import { Injectable } from '@nestjs/common';
import { PrometheusService } from '../prometheus/prometheus.service';

@Injectable()
export class EmailsService {
  constructor(
    private prisma: PrismaService,
    private prometheusService: PrometheusService,
  ) {}

  async getAllEmails(): Promise<Subscription[]> {
    const emails = await this.prisma.subscription.findMany();
    return emails;
  }

  async subscribeEmail(email: string): Promise<Subscription | null> {
    const subscribedEmail = await this.prisma.subscription.findUnique({
      where: { email },
    });
    if (subscribedEmail) {
      if (!subscribedEmail.deletedAt) return null;
      const updatedEmail = await this.prisma.subscription.update({
        where: { email },
        data: { deletedAt: null, status: 'SUBSCRIBED' },
      });
      this.prometheusService.incrementSubscribeCount();
      return updatedEmail;
    }
    const newEmail = await this.prisma.subscription.create({
      data: { email },
    });
    this.prometheusService.incrementSubscribeCount();
    return newEmail;
  }

  async unsubscribeEmail(email: string): Promise<Subscription | null> {
    const subscribedEmail = await this.prisma.subscription.findUnique({
      where: { email },
    });
    if (!subscribedEmail) return null;
    const updatedEmail = await this.prisma.subscription.update({
      where: { email },
      data: { deletedAt: new Date(), status: 'UNSUBSCRIBED' },
    });
    this.prometheusService.incrementUnsubscribeCount();
    return updatedEmail;
  }
}
