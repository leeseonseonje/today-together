import {Quote} from '../quote.entity';

export const todayQuoteRepository = 'todayQuoteRepository';

export interface TodayQuoteRepository {
  findTodayQuote(): Promise<Quote>;
  save(todayQuote: Quote): Promise<Quote>;
}
