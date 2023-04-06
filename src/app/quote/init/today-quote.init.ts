import {Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {QuoteService} from '../service/quote.service';

@Injectable()
export class TodayQuoteInit implements OnApplicationBootstrap {

  constructor(
    private readonly quoteService: QuoteService,
  ) {
  }
  async onApplicationBootstrap() {
    return await this.quoteService.initTodayQuote();
  }
}
