import {Test, TestingModule} from '@nestjs/testing';
import {QuoteModule} from '../../../../src/app/quote/QuoteModule';
import {QuoteService} from '../../../../src/app/quote/service/QuoteService';
import {getConnection, QueryRunner} from 'typeorm';
import {TransactionUtil} from '../../../util/TestTransactionUtil';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from '../../../../src/db/config';
import {instance, mock} from 'ts-mockito';
import {ZenQuoteApi} from '../../../../src/app/quote/api/ZenQuoteApi';
import {PapagoApi} from '../../../../src/app/translator/PapagoApi';
import {ActivityRepository} from '../../../../src/app/activity/repository/ActivityRepository';

describe('Quote Service Integration Test', () => {
  let sut: QuoteService;
  let r;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig), QuoteModule],
    }).compile();

    let quoteApi = mock(ZenQuoteApi);
    let papagoApi = mock(PapagoApi);
    sut = new QuoteService(instance(quoteApi), instance(papagoApi));

  });

  afterEach(async () => {
    await getConnection().dropDatabase();
  });

  it('saveTest', async () => {
    let result = await sut.todayQuote();
    console.log(result);
    await r.rollbackTransaction();
  });
});
