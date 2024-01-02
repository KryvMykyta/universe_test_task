import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CoinMarketService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  async getCoinMarketExchangeRate(): Promise<number> {
    const { data } = await this.httpService.axiosRef.get<{ rate: number }>(
      this.config.get('COIN_MARKET_URL'),
    );
    return data.rate;
  }
}
