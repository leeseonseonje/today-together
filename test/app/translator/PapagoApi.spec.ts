import { Test, TestingModule } from '@nestjs/testing';
import { TranslatorApi } from '../../../src/app/translator/TranslatorApi';
import { HttpModule } from '@nestjs/axios';
import { PapagoApi } from '../../../src/app/translator/PapagoApi';
import { InternalServerErrorException } from '@nestjs/common';

describe('papagoApi', () => {
  let api: TranslatorApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PapagoApi],
    }).compile();

    api = module.get<TranslatorApi>(PapagoApi);
  });

  it('apiCall', async () => {
    const result = await api.translation('Hello');
    expect(result).toBe('안녕하세요.');
  });

  it('error', async () => {
    await expect(async () => await api.translation('한글')).rejects.toThrowError(InternalServerErrorException);
  });
});
