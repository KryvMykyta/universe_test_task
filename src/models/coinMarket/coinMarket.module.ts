import { Module } from '@nestjs/common';
import { CoinMarketService } from './coinMarket.service';
import { HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [HttpService],
  exports: [CoinMarketService],
})
export class CoinMarketModule {}
