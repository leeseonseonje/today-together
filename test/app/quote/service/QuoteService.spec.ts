import {Test, TestingModule} from '@nestjs/testing';
import {QuoteModule} from '../../../../src/app/quote/QuoteModule';
import {QuoteService} from '../../../../src/app/quote/service/QuoteService';
import {getConnection} from 'typeorm';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from '../../../../src/db/config';
import {instance, mock} from 'ts-mockito';
import {ZenQuoteApi} from '../../../../src/app/quote/api/ZenQuoteApi';
import {PapagoApi} from '../../../../src/app/translator/PapagoApi';
import {QuoteRepository} from '../../../../src/app/quote/repository/QuoteRepository';
import {Quote} from '../../../../src/app/quote/Quote.entity';
import {LocalDate} from 'js-joda';

describe('Quote Service Integration Test', () => {
  let sut: QuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig), QuoteModule],
    }).compile();

    let quoteApi = mock(ZenQuoteApi);
    let papagoApi = mock(PapagoApi);
    sut = new QuoteService(instance(quoteApi), instance(papagoApi));

  });

  it('saveTest', async () => {
    await getConnection().getCustomRepository(QuoteRepository).save(new Quote('author', 'quote', LocalDate.now()));
    await getConnection().getCustomRepository(QuoteRepository).save(new Quote('author', 'quote', LocalDate.now()));
    await getConnection().getCustomRepository(QuoteRepository).save(new Quote('author', 'quote', LocalDate.now()));
    await getConnection().getCustomRepository(QuoteRepository).save(new Quote('author', 'quote', LocalDate.now()));
    await getConnection().getCustomRepository(QuoteRepository).save(new Quote('author', 'quote', LocalDate.now()));
    let result = await sut.todayQuote();
  });
});
