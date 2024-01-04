import { Module } from '@nestjs/common';
import { SubscriptionDao } from './subscription/subscription.dao';
import { PrismaService } from '../prismadb/prisma.service';
import { RateDao } from './rate/rate.dao';

@Module({
  imports: [],
  controllers: [],
  providers: [RateDao, SubscriptionDao, PrismaService],
  exports: [SubscriptionDao, RateDao],
})
export class DaoModule {}
