import {TodayQuoteRepository} from './TodayQuoteRepository';
import {Injectable} from '@nestjs/common';
import {Quote} from '../Quote.entity';

@Injectable()
export class TodayQuoteMemoryRepository implements TodayQuoteRepository {

  private static todayQuote: Quote;

  findTodayQuote() {
    return TodayQuoteMemoryRepository.todayQuote;
  }

  save(todayQuote: Quote) {
    TodayQuoteMemoryRepository.todayQuote = todayQuote;
  }
}
