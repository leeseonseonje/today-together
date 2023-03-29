import {Test, TestingModule} from '@nestjs/testing';
import {QuoteModule} from '../../../../src/app/quote/QuoteModule';
import {QuoteService} from '../../../../src/app/quote/service/QuoteService';
import {DataSource, QueryRunner, Repository} from 'typeorm';
import {Quote} from '../../../../src/app/quote/Quote.entity';
import {TransactionUtil} from '../../../util/TestTransactionUtil';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from '../../../../src/db/config';

describe('Quote Service Integration Test', () => {
  let sut: QuoteService;
  let dataSource: DataSource;
  let queryRunner: QueryRunner;
  let repository: Repository<Quote>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig), QuoteModule],
    }).compile();

    dataSource = module.get<DataSource>(DataSource);
    // let quoteApi = mock(ZenQuoteApi);
    // let papagoApi = mock(PapagoApi);
    sut = module.get<QuoteService>(QuoteService);
    queryRunner = await TransactionUtil.getTransaction(dataSource);

    // repository = queryRunner.manager.getRepository(Quote);
    // sut = new QuoteService(repository, instance(quoteApi), instance(papagoApi));

  });

  afterEach(async () => {
    await TransactionUtil.rollback(dataSource, queryRunner);
  });

  it('saveTest', async () => {
    let quote = await sut.todayQuote();
    console.log(quote === dataSource.getRepository(Quote));
  });
});
