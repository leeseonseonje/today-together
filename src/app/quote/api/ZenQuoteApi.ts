import {QuoteApi} from './QuoteApi';
import {HttpService} from '@nestjs/axios';
import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {QuoteApiResponseDto} from './dto/QuoteApiResponseDto';

@Injectable()
export class ZenQuoteApi implements QuoteApi {

  private readonly url: string = 'https://zenquotes.io/api/today';

  constructor(private readonly httpService: HttpService) {
  }


  async getQuote() {
    const response = await this.httpService.axiosRef.get(this.url);

    if (response.status !== 200) {
      throw new InternalServerErrorException('명언이 없습니다.');
    }

    return new QuoteApiResponseDto(response.data[0].q, response.data[0].a)
  }
}
