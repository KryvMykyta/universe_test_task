import { Module } from '@nestjs/common';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { MailModule } from '../mailer/mailer.module';
import { DataCollectorModule } from '../dataCollector/dataCollector.module';
import { DaoModule } from '../dao/dao.module';

@Module({
  imports: [MailModule, DataCollectorModule, DaoModule],
  controllers: [RateController],
  providers: [RateService],
})
export class RateModule {}
