import { PrismaService } from 'src/prisma.service';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { Module } from '@nestjs/common';
import { PrometheusModule } from '../prometheus/prometheus.module';

@Module({
  imports: [PrometheusModule],
  controllers: [EmailsController],
  providers: [EmailsService, PrismaService],
})
export class EmailsModule {}
