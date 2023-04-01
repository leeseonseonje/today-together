import {QuoteApiResponseDto} from './dto/QuoteApiResponseDto';

export const quoteApi = 'quoteApi';

export interface QuoteApi {
  getQuote(): Promise<QuoteApiResponseDto>;
}
