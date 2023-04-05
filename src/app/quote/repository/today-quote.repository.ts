import {Quote} from '../Quote.entity';

export const todayQuoteRepository = 'todayQuoteRepository';

export interface TodayQuoteRepository {
  findTodayQuote(): Promise<Quote>;
  save(todayQuote: Quote): Promise<Quote>;
}
