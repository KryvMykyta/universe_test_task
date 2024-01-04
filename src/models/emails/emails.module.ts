import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { Module } from '@nestjs/common';
import { PrometheusModule } from '../prometheus/prometheus.module';
import { DaoModule } from '../dao/dao.module';

@Module({
  imports: [PrometheusModule, DaoModule],
  controllers: [EmailsController],
  providers: [EmailsService],
})
export class EmailsModule {}
