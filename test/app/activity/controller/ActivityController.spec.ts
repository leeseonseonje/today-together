import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../../../../src/app.module';

describe('ActivityController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('e2e 파라미터가 없을 경우', () => {
    return request(app.getHttpServer())
      .get('/activity')
      .expect(200)
  });

  it('e2e 올바른 파라미터', () => {
    return request(app.getHttpServer())
      .get('/activity')
      .query({
        type: 'education'
      })
      .expect(200);
  });

  it('e2e 잘못된 파라미터', () => {
    return request(app.getHttpServer())
      .get('/activity')
      .query({
        type: 'bad-request'
      })
      .expect(400);
  });
});
