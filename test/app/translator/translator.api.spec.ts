import { Test, TestingModule } from '@nestjs/testing';
import {translatorApi, TranslatorApi} from '../../../src/app/translator/translator.api';
import { InternalServerErrorException } from '@nestjs/common';
import {TranslatorModule} from '../../../src/app/translator/translator.module';

describe('papagoApi', () => {
  let sut: TranslatorApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TranslatorModule],
    }).compile();

    sut = module.get(translatorApi);
  });

  it('apiCall', async () => {
    const result = await sut.translation('Hello');

    expect(result).toBe('안녕하세요.');
  });

  it('error', async () => {
    await expect(async () => await sut.translation('한글')).rejects.toThrowError(InternalServerErrorException);
  });
});
