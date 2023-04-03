import {TodayQuoteRepository} from './TodayQuoteRepository';
import {Injectable} from '@nestjs/common';
import {Quote} from '../Quote.entity';
import {getConnection} from 'typeorm';
import {QuoteRepository} from './QuoteRepository';

@Injectable()
export class TodayQuoteMemoryRepository implements TodayQuoteRepository {

  private static todayQuote: Quote;

  async findTodayQuote() {
    if (TodayQuoteMemoryRepository.todayQuote) {
      return TodayQuoteMemoryRepository.todayQuote;
    } else {
      const quoteRepository = getConnection().getCustomRepository(QuoteRepository);
      TodayQuoteMemoryRepository.todayQuote = await quoteRepository.findTodayQuote();
      return TodayQuoteMemoryRepository.todayQuote;
    }
  }

  async save(todayQuote: Quote) {
    const savedTodayQuote = await getConnection().getCustomRepository(QuoteRepository).save(todayQuote);
    TodayQuoteMemoryRepository.todayQuote = savedTodayQuote;
    return savedTodayQuote;
  }
}
