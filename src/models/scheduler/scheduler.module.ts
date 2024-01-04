import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { DataCollectorModule } from '../dataCollector/dataCollector.module';
import { MailModule } from '../mailer/mailer.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DaoModule } from '../dao/dao.module';

@Module({
  imports: [
    DataCollectorModule,
    MailModule,
    ScheduleModule.forRoot(),
    DaoModule,
  ],
  controllers: [],
  providers: [SchedulerService],
})
export class SchedulerModule {}
