import { Module } from '@nestjs/common';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { PrismaService } from 'src/prisma.service';
import { MailModule } from '../mailer/mailer.module';
import { DataCollectorModule } from '../dataCollector/dataCollector.module';

@Module({
  imports: [MailModule, DataCollectorModule],
  controllers: [RateController],
  providers: [RateService, PrismaService],
})
export class RateModule {}
