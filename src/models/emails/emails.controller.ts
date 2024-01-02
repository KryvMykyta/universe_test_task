import { EmailsService } from './emails.service';
import {
  Controller,
  Get,
  Res,
  Post,
  HttpStatus,
  Delete,
  Body,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Subscription } from '@prisma/client';
import { Response } from 'express';

@Controller('/api/emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Get()
  async getAllEmails(@Res() res: Response) {
    const subscriptions = await this.emailsService.getAllEmails();
    return res.status(HttpStatus.OK).send(subscriptions);
  }

  @Delete()
  async unsubscribeEmail(
    @Body() emailData: { email: string },
    @Res() res: Response,
  ) {
    try {
      const { email } = emailData;
      const result = await this.emailsService.unsubscribeEmail(email);
      if (!result) throw new NotFoundException('Email is not subscribed');
      return res.status(HttpStatus.OK).send('Email unsubscribed');
    } catch (err) {
      throw err;
    }
  }

  @Post()
  async subscribeEmail(@Body() emailData: Subscription, @Res() res: Response) {
    try {
      const { email } = emailData;
      const result = await this.emailsService.subscribeEmail(email);
      if (!result) throw new ConflictException('Email is already subscribed');
      return res.status(HttpStatus.OK).send('Email subscribed');
    } catch (err) {
      throw err;
    }
  }
}
