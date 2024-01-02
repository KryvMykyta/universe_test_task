import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { PrometheusModule } from '../prometheus/prometheus.module';

@Module({
  imports: [PrometheusModule],
  controllers: [MetricsController],
  providers: [MetricsService],
})
export class MetricsModule {}
