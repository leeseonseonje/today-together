import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {getConnection} from 'typeorm';
import {ApiModule} from '../../../src/api.module';

describe('QuoteController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await getConnection().close();
  });

  it('오늘의 명언 반환 (response: { text: 명언, author: 말한사람 })', async () => {
    const response = await request(app.getHttpServer())
      .get('/quotes')
      .expect(200);

    expect('text' in response.body).toBeTruthy();
    expect('author' in response.body).toBeTruthy();
  });
});
