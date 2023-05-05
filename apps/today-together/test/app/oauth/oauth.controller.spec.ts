import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../../../src/app.module';

describe('OauthController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('oauth 로그인', async () => {
    let response = await request(app.getHttpServer())
      .post('/oauth2/login')
      .send({
        accessToken: 'accessToken',
        server: 'google'
      })
      .expect(201);
  });
});
