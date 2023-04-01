import {Test} from '@nestjs/testing';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from '../../../../src/db/config';
import {QuoteModule} from '../../../../src/app/quote/QuoteModule';
import {TodayQuoteScheduler} from '../../../../src/app/quote/scheduler/TodayQuoteScheduler';

describe('오늘의 명언 스케쥴러', () => {

  let todayQuoteScheduler: TodayQuoteScheduler;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig), QuoteModule],
    }).compile();

    todayQuoteScheduler = module.get<TodayQuoteScheduler>(TodayQuoteScheduler);
  });
  it('should execute the cron job every hour', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2022-01-01T00:00:00Z').getTime());

    await todayQuoteScheduler.refreshTodayQuote();

    jest.setSystemTime(new Date('2022-01-01T01:00:00Z').getTime());

    await todayQuoteScheduler.refreshTodayQuote();
  });
})
