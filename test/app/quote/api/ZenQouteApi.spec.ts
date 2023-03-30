import {Test, TestingModule} from '@nestjs/testing';
import {HttpModule} from '@nestjs/axios';
import {ZenQuoteApi} from '../../../../src/app/quote/api/ZenQuoteApi';

describe('RecommendTodoApi', () => {
  let sut: ZenQuoteApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ZenQuoteApi],
    }).compile();

    sut = module.get<ZenQuoteApi>(ZenQuoteApi);
  });

  it('zen quote api 호출', async () => {
    let result = await sut.getQuote();

    expect(result.text).toBeTruthy()
    expect(result.author).toBeTruthy()
  });
});
