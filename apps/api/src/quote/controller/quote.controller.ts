import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Controller, Get} from '@nestjs/common';
import {ResponseTodayQuoteDto} from '../../../../today-together/src/app/quote/service/dto/response-today-quote.dto';

@ApiTags('quote')
@Controller('/quotes')
export class QuoteController {

  constructor(private readonly quoteService: QuoteService) {
  }

  @ApiOperation({summary: '오늘의 명언 조회'})
  @ApiResponse({
    status: 200,
    type: ResponseTodayQuoteDto
  })
  @Get()
  async getTodayQuote() {
    return await this.quoteService.getTodayQuote();
  }
}
