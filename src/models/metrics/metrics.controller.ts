import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { MetricsService } from './metrics.service';

@Controller('/api/metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  async getMetrics(@Res() res: Response) {
    const metrics = await this.metricsService.getMetrics();
    return res.status(HttpStatus.OK).send(metrics);
  }
}
