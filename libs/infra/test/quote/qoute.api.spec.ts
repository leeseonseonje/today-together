import {Test, TestingModule} from '@nestjs/testing';
import {HttpModule} from '@nestjs/axios';
import {ZenQuoteApi} from 'lib/infra/quote/zen-quote.api';
import {QuoteInfraModule} from 'lib/infra/quote/quote-infra.module';
import {quoteApi, QuoteApi} from 'lib/infra/quote/quote.api';

describe('RecommendTodoApi', () => {
  let sut: QuoteApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [QuoteInfraModule],
    }).compile();

    sut = module.get(quoteApi);
  });

  it('zen quote api 호출', async () => {
    let result = await sut.getQuote();
    console.log(result);
    expect(result).toBeTruthy()
  });
});
