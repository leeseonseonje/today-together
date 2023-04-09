import {TodayQuoteRepository} from './today-quote.repository';
import {Injectable} from '@nestjs/common';
import {Quote} from '../quote.entity';
import {getConnection} from 'typeorm';
import {QuoteRepository} from './quote.repository';

@Injectable()
export class TodayQuoteMemoryRepository implements TodayQuoteRepository {

  private static todayQuote: Quote;

  async findTodayQuote() {
    if (TodayQuoteMemoryRepository.todayQuote) {
      return TodayQuoteMemoryRepository.todayQuote;
    } else {
      const quoteRepository = this.getQuoteRepository();
      TodayQuoteMemoryRepository.todayQuote = await quoteRepository.findTodayQuote();
      return TodayQuoteMemoryRepository.todayQuote;
    }
  }

  async save(todayQuote: Quote) {
    const savedTodayQuote = await this.getQuoteRepository().save(todayQuote);
    TodayQuoteMemoryRepository.todayQuote = savedTodayQuote;
    return savedTodayQuote;
  }

  private getQuoteRepository() {
    return getConnection().getCustomRepository(QuoteRepository);
  }
}
