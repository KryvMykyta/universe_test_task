import { Injectable } from '@nestjs/common';
// import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { PrometheusService } from '../prometheus/prometheus.service';

@Injectable()
export class MetricsService {
  constructor(private prometheusService: PrometheusService) {}

  async getMetrics(): Promise<any> {
    return this.prometheusService.getMetrics();
  }
}
