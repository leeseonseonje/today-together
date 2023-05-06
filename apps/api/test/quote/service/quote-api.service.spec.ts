import {QuoteApiService} from '../../../src/quote/service/quote-api.service';
import {QuoteApi} from 'lib/infra/quote/quote.api';
import {TranslatorApi} from 'lib/infra/translator/translator.api';
import {QuoteRepository} from 'lib/entity/domains/quote/repository/quote.repository';
import {todayQuoteRepository, TodayQuoteRepository} from 'lib/entity/domains/quote/repository/today-quote.repository';
import {Test, TestingModule} from '@nestjs/testing';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from '../../db-config';
import {QuoteApiModule} from '../../../src/quote/quote-api.module';
import {instance, mock, when} from 'ts-mockito';
import {getConnection} from 'typeorm';
import {ZenQuoteApi} from 'lib/infra/quote/zen-quote.api';
import {PapagoApi} from 'lib/infra/translator/papago.api';
import {LocalDate} from 'js-joda';
import {Quote} from 'lib/entity/domains/quote/quote.entity';
import {ResponseQuoteApiDto} from 'lib/infra/quote/dto/response-quote-api.dto';

describe('Quote Api Service Integration Test', () => {
  let sut: QuoteApiService;
  let quoteApi: QuoteApi;
  let papagoApi: TranslatorApi;
  let quoteRepository: QuoteRepository;
  let todayQuoteRepo: TodayQuoteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig), QuoteApiModule],
    }).compile();

    quoteApi = mock(ZenQuoteApi);
    papagoApi = mock(PapagoApi);
    quoteRepository = getConnection().getCustomRepository(QuoteRepository);
    todayQuoteRepo = module.get(todayQuoteRepository);
    sut = new QuoteApiService(instance(quoteApi), instance(papagoApi), todayQuoteRepo);
  });

  afterEach(async () => {
    await getConnection().dropDatabase();
    await getConnection().close();
  })

  it('오늘의 명언 갱신', async () => {
    await apiStub();

    const result = await sut.refreshTodayQuote();

    const todayQuote = await quoteRepository.findByDay(LocalDate.now());
    expect(result.id).toBe(todayQuote.id);
    expect(result.text).toBe('오늘명언갱신');
    expect(result.author).toBe('갱신');
    expect(result.day.isEqual(LocalDate.now())).toBeTruthy();
  });

  it('오늘의 명언 조회 메모리에서 오늘의 명언을 바로 조회', async () => {
    await todayQuoteRepo.save(new Quote('오늘명언조회', '조회', LocalDate.now()));

    const result = await sut.getTodayQuote();

    expect(result.text).toBe('오늘명언조회');
    expect(result.author).toBe('조회');
  });

  it('오늘의 명언 캐싱 -> db에 있는 가장 최근 명언이 오늘 날짜와 같으면 메모리에 저장', async () => {
    await quoteRepository
      .save(new Quote('오늘명언조회', '조회', LocalDate.now()));
    await apiStub();

    await sut.cacheTodayQuote();

    let resultTodayQuote = await todayQuoteRepo.findTodayQuote();
    expect(resultTodayQuote.text).toBe('오늘명언조회')
    expect(resultTodayQuote.author).toBe('조회')
    expect(resultTodayQuote.day.isEqual(LocalDate.now())).toBeTruthy();
  });

  it('오늘의 명언 캐싱 -> db에 있는 가장 최근 명언이 오늘 날짜와 다르면 refreshTodayQuote 호출 후 명언 메모리에 캐싱', async () => {
    await quoteRepository
      .save(new Quote('오늘명언조회', '작가', LocalDate.of(9999, 12, 30)));
    await apiStub();

    const result = await sut.cacheTodayQuote();

    expect(result.day.isEqual(LocalDate.now())).toBeTruthy();
  });

  const apiStub = async () => {
    when(await quoteApi.getQuote()).thenReturn(new ResponseQuoteApiDto('refreshToday', 'author'));
    when(await papagoApi.translation('refreshToday-author')).thenReturn('오늘명언갱신-갱신');
  }
});
