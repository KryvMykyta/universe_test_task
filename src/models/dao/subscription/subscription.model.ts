import { Prisma } from '@prisma/client';
import { IsEmail } from 'class-validator';

export class SubscriptionCreateInput implements Prisma.SubscriptionCreateInput {
  email: string;
}

export class SubscriptionCreateDto {
  @IsEmail()
  email: string;
}
