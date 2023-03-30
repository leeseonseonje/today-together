import {QuoteApi} from './QuoteApi';
import {HttpService} from '@nestjs/axios';
import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {QuoteApiResponse} from './dto/QuoteApiResponse';

@Injectable()
export class ZenQuoteApi implements QuoteApi {
  constructor(private readonly httpService: HttpService) {
  }

  private readonly url: string = 'https://zenquotes.io/api/today';

  async getQuote() {
    const response = await this.httpService.axiosRef.get(this.url);

    if (response.status !== 200) {
      throw new InternalServerErrorException('명언이 없습니다.');
    }

    const responseData: QuoteApiResponse = {
      text: response.data[0].q,
      author: response.data[0].a
    };
    return responseData;
  }
}
