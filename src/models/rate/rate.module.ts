import { Module } from '@nestjs/common';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { PrismaService } from 'src/prisma.service';
import { MailService } from '../mailer/mailer.service';
import { MailModule } from '../mailer/mailer.module';
import { PrometheusModule } from '../prometheus/prometheus.module';
import { CoinMarketModule } from '../coinMarket/coinMarket.module';

@Module({
  imports: [MailModule, PrometheusModule, CoinMarketModule],
  controllers: [RateController],
  providers: [RateService, PrismaService, MailService],
})
export class RateModule {}
