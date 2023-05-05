import {Test} from '@nestjs/testing';
import {TodayQuoteInit} from '../../../../src/app/quote/init/today-quote.init';
import {QuoteService} from '../../../../src/app/quote/service/quote.service';
import {LocalDate} from 'js-joda';
import {QuoteModule} from '../../../../src/app/quote/quote.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from '../../../../src/db/config';

describe('InitTodayQuote', () => {
  let initTodayQuote: TodayQuoteInit;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig), QuoteModule],
    }).compile();

    initTodayQuote = module.get<TodayQuoteInit>(TodayQuoteInit);
  });

  it('애플리케이션이 실행되면 refreshTodayQuote 실행', async () => {
    const result = await initTodayQuote.onApplicationBootstrap();
    expect(result.day.isEqual(LocalDate.now())).toBeTruthy();
  });
});
