import {LocalDate} from 'js-joda';
import {TodayQuoteInit} from '../../../src/quote/init/today-quote.init';
import {QuoteApiModule} from '../../../src/quote/quote-api.module';
import {getConnection} from 'typeorm';
import {Test, TestingModule} from '@nestjs/testing';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from '../../../../../libs/common/test/test-config';

describe('TodayQuoteInit테스트 - api 서버 실행시 실행된다.', () => {
  let initTodayQuote: TodayQuoteInit;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig), QuoteApiModule],
    }).compile()

    initTodayQuote = module.get<TodayQuoteInit>(TodayQuoteInit);
  });

  afterEach(async () => {
    await getConnection().dropDatabase();
  })

  it('api 서버 실행 시 오늘의 명언을 memory에 캐싱', async () => {
    const result = await initTodayQuote.onApplicationBootstrap();
    expect(result.day.isEqual(LocalDate.now())).toBeTruthy();
  });
});
