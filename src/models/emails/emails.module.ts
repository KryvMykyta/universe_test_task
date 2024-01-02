import { PrismaService } from 'src/prisma.service';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { Module } from '@nestjs/common';
import { PrometheusService } from '../prometheus/prometheus.service';
import { PrometheusModule } from '../prometheus/prometheus.module';

@Module({
  imports: [PrometheusModule],
  controllers: [EmailsController],
  providers: [EmailsService, PrismaService, PrometheusService],
})
export class EmailsModule {}
