import {Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {QuoteService} from '../service/QuoteService';

@Injectable()
export class InitTodayQuote implements OnApplicationBootstrap {

  constructor(
    private readonly quoteService: QuoteService,
  ) {
  }
  async onApplicationBootstrap() {
    const todayQuote = await this.quoteService.refreshTodayQuote();
    console.log(todayQuote);
  }
}
