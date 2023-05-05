import {Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {QuoteApiService} from '../service/quote-api.service';

@Injectable()
export class TodayQuoteInit implements OnApplicationBootstrap {

  constructor(
    private readonly quoteService: QuoteApiService,
  ) {
  }
  async onApplicationBootstrap() {
    return await this.quoteService.initTodayQuote();
  }
}
