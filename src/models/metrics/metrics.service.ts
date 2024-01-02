import { Injectable } from '@nestjs/common';
import { PrometheusService } from '../prometheus/prometheus.service';

@Injectable()
export class MetricsService {
  constructor(private prometheusService: PrometheusService) {}

  async getMetrics(): Promise<any> {
    return this.prometheusService.getMetrics();
  }
}
