import { Prisma } from '@prisma/client';

export class RateCreateInput implements Prisma.RateCreateInput {
  rate: number;
}
