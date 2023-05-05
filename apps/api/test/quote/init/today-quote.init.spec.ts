import {Test} from '@nestjs/testing';
import {LocalDate} from 'js-joda';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TodayQuoteInit} from '../../../src/quote/init/today-quote.init';
import {dbConfig} from '../../db-config';
import {QuoteApiModule} from '../../../src/quote/quote-api.module';

describe('InitTodayQuote', () => {
  let initTodayQuote: TodayQuoteInit;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig), QuoteApiModule],
    }).compile();

    initTodayQuote = module.get<TodayQuoteInit>(TodayQuoteInit);
  });

  it('애플리케이션이 실행되면 refreshTodayQuote 실행', async () => {
    const result = await initTodayQuote.onApplicationBootstrap();
    expect(result.day.isEqual(LocalDate.now())).toBeTruthy();
  });
});
