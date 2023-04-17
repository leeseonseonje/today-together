import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../../../../src/app.module';
import {getConnection} from 'typeorm';

describe('QuoteController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await getConnection().close();
  });

  it('오늘의 명언', async () => {
    const response = await request(app.getHttpServer())
      .get('/quotes')
      .expect(200);

    expect('text' in response.body).toBeTruthy();
    expect('author' in response.body).toBeTruthy();
  });
});
