import { Prisma } from '@prisma/client';
import { IsEmail } from 'class-validator';

export class Subscription implements Prisma.SubscriptionCreateInput {
  email: string;
}

export class SubscriptionCreateDto {
  @IsEmail()
  email: string;
}
