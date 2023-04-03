import {Test, TestingModule} from '@nestjs/testing';
import {QuoteModule} from '../../../../src/app/quote/QuoteModule';
import {QuoteService} from '../../../../src/app/quote/service/QuoteService';
import {getConnection} from 'typeorm';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from '../../../../src/db/config';
import {instance, mock, when} from 'ts-mockito';
import {ZenQuoteApi} from '../../../../src/app/quote/api/ZenQuoteApi';
import {PapagoApi} from '../../../../src/app/translator/PapagoApi';
import {QuoteRepository} from '../../../../src/app/quote/repository/QuoteRepository';
import {Quote} from '../../../../src/app/quote/Quote.entity';
import {LocalDate} from 'js-joda';
import {QuoteApi, quoteApi} from '../../../../src/app/quote/api/QuoteApi';
import {translatorApi, TranslatorApi} from '../../../../src/app/translator/TranslatorApi';
import {QuoteApiResponseDto} from '../../../../src/app/quote/api/dto/QuoteApiResponseDto';
import {todayQuoteRepository, TodayQuoteRepository} from '../../../../src/app/quote/repository/TodayQuoteRepository';

describe('Quote Service Integration Test', () => {
  let sut: QuoteService;
  let quoteApi: QuoteApi;
  let papagoApi: TranslatorApi;
  let quoteRepository: QuoteRepository;
  let todayQuoteRepo: TodayQuoteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig), QuoteModule],
    }).compile();

    quoteApi = mock(ZenQuoteApi);
    papagoApi = mock(PapagoApi);
    quoteRepository = getConnection().getCustomRepository(QuoteRepository);
    todayQuoteRepo = module.get(todayQuoteRepository);
    sut = new QuoteService(instance(quoteApi), instance(papagoApi), todayQuoteRepo);
  });

  afterEach(async () => {
    await getConnection().close();
  })

  it('오늘의 명언 갱신', async () => {
    await apiStub();

    const result = await sut.refreshTodayQuote();

    const todayQuote = await quoteRepository.findTodayQuote();
    expect(result.id).toBe(todayQuote.id);
    expect(result.text).toBe('오늘명언갱신');
    expect(result.author).toBe('갱신');
    expect(result.day.isEqual(LocalDate.now())).toBeTruthy();
  });

  it('오늘의 명언 조회 메모리에서 오늘의 명언을 바로 조회', async () => {
    await quoteRepository
      .save(new Quote('오늘명언조회', '조회', LocalDate.now()));

    const result = await sut.getTodayQuote();

    expect(result.text).toBe('오늘명언조회');
    expect(result.author).toBe('조회');
  });

  it('오늘의 명언 조회 -> db에 있는 가장 최근 명언이 오늘 날짜와 같으면 메모리에 저장', async () => {
    await quoteRepository
      .save(new Quote('오늘명언조회', '조회', LocalDate.now()));
    await apiStub();

    await sut.initTodayQuote();

    let resultTodayQuote = await todayQuoteRepo.findTodayQuote();
    expect(resultTodayQuote.text).toBe('오늘명언조회')
    expect(resultTodayQuote.author).toBe('조회')
    expect(resultTodayQuote.day.isEqual(LocalDate.now())).toBeTruthy();
  });

  it('오늘의 명언 조회 -> db에 있는 가장 최근 명언이 오늘 날짜와 다르면 refreshTodayQuote 호출', async () => {
    await quoteRepository
      .save(new Quote('오늘명언조회', '작가', LocalDate.of(9999, 12, 30)));
    await apiStub();
    const result = await sut.initTodayQuote();

    console.log(result);
    expect(result.day.isEqual(LocalDate.now()));
  });

  const apiStub = async () => {
    when(await quoteApi.getQuote()).thenReturn(new QuoteApiResponseDto('refreshToday', 'author'));
    when(await papagoApi.translation('refreshToday-author')).thenReturn('오늘명언갱신-갱신');
  }
});
