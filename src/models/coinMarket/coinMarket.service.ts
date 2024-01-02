import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CoinMarketService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
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
}
