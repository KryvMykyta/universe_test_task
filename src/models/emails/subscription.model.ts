import { Prisma } from '@prisma/client';

export class Subscription implements Prisma.SubscriptionCreateInput {
  email: string;
}
