import { Injectable } from "@nestjs/common";
import {QuoteApiService} from '../service/quote-api.service';
import {Cron} from '@nestjs/schedule';

@Injectable()
export class TodayQuoteScheduler {
  constructor(
    private readonly quoteApiService: QuoteApiService,
  ) {}

  // @Cron('*/5 * * * * *')
  @Cron('0 0 0 * * *', {
    timeZone: 'Asia/Seoul',
  })
  async refreshTodayQuote() {
    const todayQuote = await this.quoteApiService.refreshTodayQuote();
    console.log(todayQuote);
  }

}
