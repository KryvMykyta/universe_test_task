import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mailer.service';
import { ConfigService } from '@nestjs/config';
import { PrometheusModule } from '../prometheus/prometheus.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          port: config.get('MAIL_PORT'),
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: config.get('MAIL_FROM'),
        },
      }),
      inject: [ConfigService],
    }),
    PrometheusModule,
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
