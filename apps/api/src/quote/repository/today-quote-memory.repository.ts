import {Injectable} from '@nestjs/common';
import {TodayQuoteRepository} from 'lib/entity/domains/quote/repository/today-quote.repository';
import {Quote} from 'lib/entity/domains/quote/quote.entity';
import {getConnection} from 'typeorm';
import {QuoteRepository} from 'lib/entity/domains/quote/repository/quote.repository';
import {LocalDate} from 'js-joda';

@Injectable()
export class TodayQuoteMemoryRepository implements TodayQuoteRepository {

  private static todayQuote: Quote;

  async findTodayQuote() {
    if (TodayQuoteMemoryRepository.todayQuote) {
      return TodayQuoteMemoryRepository.todayQuote;
    }
    const quoteRepository = this.getQuoteRepository();
    TodayQuoteMemoryRepository.todayQuote = await quoteRepository.findByDay(LocalDate.now());
    return TodayQuoteMemoryRepository.todayQuote;

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
