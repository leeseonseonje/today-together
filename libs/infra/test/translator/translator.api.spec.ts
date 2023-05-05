import { Test, TestingModule } from '@nestjs/testing';
import {translatorApi, TranslatorApi} from 'lib/infra/translator/translator.api';
import {TranslatorInfraModule} from 'lib/infra/translator/translator-infra.module';

describe('papagoApi', () => {
  let sut: TranslatorApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TranslatorInfraModule],
    }).compile();

    sut = module.get(translatorApi);
  });

  it('apiCall', async () => {
    const result = await sut.translation('Hello');

    expect(result).toBe('안녕하세요.');
  });
});
