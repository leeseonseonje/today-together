import {ResponseQuoteApiDto} from './dto/response-quote-api.dto';

export const quoteApi = 'quoteApi';

export interface QuoteApi {
  getQuote(): Promise<ResponseQuoteApiDto>;
}
