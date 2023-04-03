import {TodayQuoteRepository} from './TodayQuoteRepository';
import {Inject, Injectable} from '@nestjs/common';
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
}
