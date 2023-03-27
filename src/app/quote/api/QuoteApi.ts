import {QuoteApiResponse} from './dto/QuoteApiResponse';

export const quoteApi = 'quoteApi';

export interface QuoteApi {
  getQuote(): Promise<QuoteApiResponse>;
}
