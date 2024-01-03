import { Module } from '@nestjs/common';
import { DataCollectorService } from './dataCollector.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PrometheusModule } from '../prometheus/prometheus.module';

@Module({
  imports: [ConfigModule, HttpModule, PrometheusModule],
  providers: [DataCollectorService],
  exports: [DataCollectorService],
})
export class DataCollectorModule {}
