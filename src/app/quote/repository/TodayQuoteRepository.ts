import {Quote} from '../Quote.entity';

export const todayQuoteRepository = 'todayQuoteRepository';

export interface TodayQuoteRepository {
  findTodayQuote();

  save(todayQuote: Quote);
}
