import { Module } from '@nestjs/common';
import { PrometheusService } from '../prometheus/prometheus.service';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { PrometheusModule } from '../prometheus/prometheus.module';

@Module({
  imports: [PrometheusModule],
  controllers: [MetricsController],
  providers: [MetricsService, PrometheusService],
})
export class MetricsModule {}
