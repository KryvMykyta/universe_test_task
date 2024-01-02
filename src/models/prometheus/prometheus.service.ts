import { Injectable } from '@nestjs/common';
import { Counter, Gauge, register } from 'prom-client';

@Injectable()
export class PrometheusService {
  private readonly subscribeCount: Counter;
  private readonly unsubscribeCount: Counter;
  private readonly sendEmailErrorCount: Counter;
  private readonly sendEmailSuccessCount: Counter;
  private readonly exchangeRate: Gauge;
  constructor() {
    register.clear();
    this.subscribeCount = new Counter({
      name: 'subscribe_count',
      help: 'Number of subscriptions',
    });
    this.unsubscribeCount = new Counter({
      name: 'unsubscribe_count',
      help: 'Number of unsubscriptions',
    });
    this.sendEmailErrorCount = new Counter({
      name: 'email_errors',
      help: 'Number of email sending errors',
    });
    this.sendEmailSuccessCount = new Counter({
      name: 'email_successes',
      help: 'Number of email sending successes',
    });
    this.exchangeRate = new Gauge({
      name: 'exchange_rate',
      help: 'Current exchange rate',
    });
    register.registerMetric(this.subscribeCount);
    register.registerMetric(this.unsubscribeCount);
    register.registerMetric(this.sendEmailErrorCount);
    register.registerMetric(this.sendEmailSuccessCount);
    register.registerMetric(this.exchangeRate);
  }

  incrementSubscribeCount() {
    this.subscribeCount.inc();
  }

  incrementUnsubscribeCount() {
    this.unsubscribeCount.inc();
  }

  incrementSendEmailErrorCount() {
    this.sendEmailErrorCount.inc();
  }

  incrementSendEmailSuccessCount() {
    this.sendEmailSuccessCount.inc();
  }

  setExchangeRate(rate: number) {
    this.exchangeRate.set(rate);
  }

  async getMetrics() {
    // return register.getMetricsAsJSON();
    return register.metrics();
  }
}
