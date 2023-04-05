import {Controller, Get} from '@nestjs/common';
import {QuoteService} from '../service/QuoteService';

@Controller('/quote')
export class QuoteController {

  constructor(private readonly quoteService: QuoteService) {
  }

  @Get()
  async getTodayQuote() {
    return await this.quoteService.getTodayQuote();
  }
}
