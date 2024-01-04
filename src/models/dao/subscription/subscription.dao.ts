import { Global, Injectable } from '@nestjs/common';
import { Subscription } from '@prisma/client';
import { PrismaService } from 'src/models/prismadb/prisma.service';

@Global()
@Injectable()
export class SubscriptionDao {
  constructor(private readonly prisma: PrismaService) {}

  async getAllSubscriptions(): Promise<Subscription[]> {
    return this.prisma.subscription.findMany();
  }

  async getActiveSubscriptions(): Promise<Subscription[]> {
    return this.prisma.subscription.findMany({
      where: { status: 'SUBSCRIBED' },
    });
  }

  async getSubscriptionByEmail(email: string): Promise<Subscription> {
    return this.prisma.subscription.findUnique({
      where: { email },
    });
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
    return updatedEmail;
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
      return updatedEmail;
    }
    const newEmail = await this.prisma.subscription.create({
      data: { email },
    });
    return newEmail;
  }
}
