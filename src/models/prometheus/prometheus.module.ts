import { Module } from '@nestjs/common';
import { PrometheusService } from './prometheus.service';

@Module({
  imports: [],
  providers: [PrometheusService],
  exports: [PrometheusService],
})
export class PrometheusModule {}
