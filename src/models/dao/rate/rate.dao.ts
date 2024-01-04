import { Global, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/models/prismadb/prisma.service';
import { RateCreateInput } from './rate.model';

@Global()
@Injectable()
export class RateDao {
  constructor(private readonly prisma: PrismaService) {}

  async getLastRateRecord() {
    const lastRateRecord = await this.prisma.rate.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return lastRateRecord;
  }

  async createRateRecord(rateData: RateCreateInput) {
    await this.prisma.rate.create({
      data: rateData,
    });
  }
}
