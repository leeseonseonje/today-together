import {Controller, Get} from '@nestjs/common';
import {QuoteService} from '../service/quote.service';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('quote')
@Controller('/quotes')
export class QuoteController {

  constructor(private readonly quoteService: QuoteService) {
  }

  @Get()
  async getTodayQuote() {
    return await this.quoteService.getTodayQuote();
  }
}
