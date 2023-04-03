import {Test} from '@nestjs/testing';
import {InitTodayQuote} from '../../../../src/app/quote/init/InitTodayQuote';
import {QuoteService} from '../../../../src/app/quote/service/QuoteService';
import {LocalDate} from 'js-joda';
import {QuoteModule} from '../../../../src/app/quote/QuoteModule';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from '../../../../src/db/config';

describe('InitTodayQuote', () => {
  let initTodayQuote: InitTodayQuote;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig), QuoteModule],
    }).compile();

    initTodayQuote = module.get<InitTodayQuote>(InitTodayQuote);
  });

  it('애플리케이션이 실행되면 refreshTodayQuote 실행', async () => {
    const result = await initTodayQuote.onApplicationBootstrap();
    expect(result.day.isEqual(LocalDate.now())).toBeTruthy();
  });
});
