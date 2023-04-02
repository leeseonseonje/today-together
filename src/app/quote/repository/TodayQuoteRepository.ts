import {Quote} from '../Quote.entity';

export interface TodayQuoteRepository {
  findTodayQuote();

  save(todayQuote: Quote);
}
