import { Module } from '@nestjs/common';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { PrismaService } from 'src/prisma.service';
import { MailService } from '../mailer/mailer.service';
import { MailModule } from '../mailer/mailer.module';
import { PrometheusService } from '../prometheus/prometheus.service';
import { PrometheusModule } from '../prometheus/prometheus.module';

@Module({
  imports: [MailModule, PrometheusModule],
  controllers: [RateController],
  providers: [RateService, PrismaService, MailService, PrometheusService],
})
export class RateModule {}
