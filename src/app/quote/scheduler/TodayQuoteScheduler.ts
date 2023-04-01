import {Injectable} from '@nestjs/common';
import {Cron} from '@nestjs/schedule';
import {QuoteService} from '../service/QuoteService';

@Injectable()
export class TodayQuoteScheduler {
  constructor(
    private readonly quoteService: QuoteService,
  ) {}

  // @Cron('*/5 * * * * *')
  @Cron('0 0 0 * * *', {
    timeZone: 'Asia/Seoul',
  })
  async refreshTodayQuote() {
    const todayQuote = await this.quoteService.refreshTodayQuote();
    console.log(todayQuote);
  }

}
