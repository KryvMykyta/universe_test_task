import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrometheusService } from '../prometheus/prometheus.service';

@Injectable()
export class DataCollectorService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
    private readonly prometheus: PrometheusService,
  ) {}

  async getBitcoinUsd(): Promise<number> {
    const { data } = await this.httpService.axiosRef.get(
      this.config.get('COIN_MARKET_BTC_USD_URL'),
      {
        headers: {
          'X-CMC_PRO_API_KEY': this.config.get('COIN_MARKET_API_KEY'),
        },
      },
    );
    const btcToUsd = data.data.filter((item) => item.symbol === 'BTC')[0];
    const btcToUsdRate = btcToUsd.quote.USD.price;
    return btcToUsdRate;
  }

  async getUsdUah(): Promise<number> {
    const { data } = await this.httpService.axiosRef.get(
      this.config.get('PRIVAT_UAH_EXCHANGE_URL'),
    );
    const uahExchangeRate = data.filter(
      (item) => item.ccy === 'USD' && item.base_ccy === 'UAH',
    )[0];
    return uahExchangeRate.buy;
  }

  async getLastRate(): Promise<number> {
    const btcToUsdRate = await this.getBitcoinUsd();
    const uahExchangeRate = await this.getUsdUah();
    const rate = btcToUsdRate * uahExchangeRate;
    this.prometheus.setExchangeRate(rate);
    return rate;
  }
}
