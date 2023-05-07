import { Injectable } from "@nestjs/common";
import {QuoteApiService} from '../service/quote-api.service';
import {Cron, CronExpression} from '@nestjs/schedule';

@Injectable()
export class TodayQuoteScheduler {
  constructor(
    private readonly quoteApiService: QuoteApiService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    timeZone: 'Asia/Seoul',
  })
  async refreshTodayQuote() {
    const todayQuote = await this.quoteApiService.refreshTodayQuote();
    console.log(`today quote: ${todayQuote}`);
  }

}
