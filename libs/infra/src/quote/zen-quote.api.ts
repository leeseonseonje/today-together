import {QuoteApi} from './quote.api';
import {HttpService} from '@nestjs/axios';
import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {ResponseQuoteApiDto} from './dto/response-quote-api.dto';

@Injectable()
export class ZenQuoteApi implements QuoteApi {

  private readonly url: string = 'https://zenquotes.io/api/today';

  constructor(private readonly httpService: HttpService) {
  }

  async getQuote(): Promise<ResponseQuoteApiDto> {
    const response = await this.httpService.axiosRef
      .get(this.url)
      .catch(error => {
        throw new InternalServerErrorException('명언이 없습니다.');
      });

    return {text: response.data[0].q, author: response.data[0].a}
  }
}
