import { Prisma } from '@prisma/client';

export class Rate implements Prisma.RateCreateInput {
  rate: number;
}
