import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../../../../src/app.module';
import {getConnection} from 'typeorm';
import {TodayQuoteInit} from '../../../../src/app/quote/init/today-quote.init';

describe('ActivityController (e2e)', () => {
  let app: INestApplication;
  let initTodayQuote: TodayQuoteInit;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    initTodayQuote = module.get<TodayQuoteInit>(TodayQuoteInit);
  });

  afterEach(async () => {
    await getConnection().close();
  });

  it('e2e 파라미터가 없을 경우', async () => {
    const response = await request(app.getHttpServer())
      .get('/quotes')
      .expect(200);

    expect('text' in response.body).toBeTruthy();
    expect('author' in response.body).toBeTruthy();
  });
});
