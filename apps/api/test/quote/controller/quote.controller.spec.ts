import * as request from 'supertest';
import {getConnection} from 'typeorm';
import {e2eTestConfig, TestApplication} from '../../../../../libs/common/test/test-config';
import {ApiModule} from '../../../src/api.module';

describe('QuoteController (e2e)', () => {
  let test: TestApplication;

  beforeEach(async () => {
    test = await e2eTestConfig(ApiModule);
  });

  afterEach(async () => {
    await getConnection().close();
  });

  it('오늘의 명언 반환 (response: { text: 명언, author: 말한사람 })', async () => {
    const response = await request(test.app.getHttpServer())
      .get('/quotes')
      .expect(200);

    expect('text' in response.body).toBeTruthy();
    expect('author' in response.body).toBeTruthy();
  });
});
