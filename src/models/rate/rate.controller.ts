import {
  Controller,
  Get,
  Res,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { Response } from 'express';
import { RateService } from './rate.service';

@Controller('/api/rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Get()
  async getRate(@Res() res: Response) {
    try {
      const rate = await this.rateService.getRate();
      if (!rate) throw new NotFoundException();
      return res.status(HttpStatus.OK).json(rate);
    } catch (err) {
      throw err;
    }
  }

  @Post()
  async sendRates(@Res() res: Response) {
    try {
      const sendingResponse = await this.rateService.sendEmails();
      return res.status(HttpStatus.OK).send(sendingResponse);
    } catch (err) {
      throw err;
    }
  }
}
