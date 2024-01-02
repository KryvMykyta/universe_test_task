import { Module } from '@nestjs/common';
import { CoinMarketService } from './coinMarket.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [CoinMarketService],
  exports: [CoinMarketService],
})
export class CoinMarketModule {}
