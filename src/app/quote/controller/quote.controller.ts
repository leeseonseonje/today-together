import {Controller, Get} from '@nestjs/common';
import {QuoteService} from '../service/quote.service';

@Controller('/quote')
export class QuoteController {

  constructor(private readonly quoteService: QuoteService) {
  }

  @Get()
  async getTodayQuote() {
    return await this.quoteService.getTodayQuote();
  }
}
