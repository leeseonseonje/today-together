import {QuoteApi} from './QuoteApi';
import {HttpService} from '@nestjs/axios';
import {NotQuoteException} from '../exception/NotActivityException';
import {QuoteApiResponse} from './dto/QuoteApiResponse';

export class ZenQuoteApi implements QuoteApi {

  constructor(private readonly httpService: HttpService) {
  }

  private readonly url: string = 'https://zenquotes.io/api/random';

  async getQuote() {

    const response = await this.httpService.axiosRef.get<QuoteApiResponse>(this.url);
    if (response.status !== 200) {
      throw new NotQuoteException('명언이 없습니다.', 400);
    }

    return response.data
  }

}
