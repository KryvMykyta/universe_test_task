import { MetricsModule } from './models/metrics/metrics.module';
import { Module } from '@nestjs/common';
import { RateModule } from './models/rate/rate.module';
import { EmailsModule } from './models/emails/emails.module';
import { ConfigModule } from '@nestjs/config';
import { SchedulerModule } from './models/scheduler/scheduler.module';

@Module({
  imports: [
    RateModule,
    EmailsModule,
    MetricsModule,
    SchedulerModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
