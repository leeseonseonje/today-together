import {Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {QuoteService} from '../service/QuoteService';

@Injectable()
export class InitTodayQuote implements OnApplicationBootstrap {

  constructor(
    private readonly quoteService: QuoteService,
  ) {
  }
  async onApplicationBootstrap() {
    return await this.quoteService.initTodayQuote();
  }
}
