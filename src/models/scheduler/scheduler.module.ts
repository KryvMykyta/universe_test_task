import { Module } from '@nestjs/common';
import { PrismaService } from 'src/models/prismadb/prisma.service';
import { SchedulerService } from './scheduler.service';
import { DataCollectorModule } from '../dataCollector/dataCollector.module';
import { MailModule } from '../mailer/mailer.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [DataCollectorModule, MailModule, ScheduleModule.forRoot()],
  controllers: [],
  providers: [SchedulerService, PrismaService],
})
export class SchedulerModule {}
