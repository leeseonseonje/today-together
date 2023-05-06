import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {getConnection} from 'typeorm';
import {ApiModule} from '../../../src/api.module';
import {OauthServerType} from 'lib/infra/oauth2/enum/oauth-server-type.enum';

describe('OauthController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    //https://accounts.google.com/o/oauth2/auth?response_type=code&scope=email%20profile&redirect_uri=http://localhost:3000/oauth2/callback&client_id=861924054252-jp6c1f7hta3423vmn5fpro0cusbld0t7.apps.googleusercontent.com
  });

  afterEach(async () => {
    await getConnection().dropDatabase();
    await getConnection().close();
  });

  it('accessToken 발급', async () => {
    const response = await request(app.getHttpServer())
      .post('/oauth2/token')
      .send({code: '4/0AbUR2VN9egDxSBgI1_2lVUf8UbMV54uOJ-z3pl8MWpd5h71GMGOX0NrRuCOJ-OS7GVcbbA', server: OauthServerType.GOOGLE})
      .expect(200);

    console.log(response.body);
  });

  it('accessToken으로 사용자 정보 반환', async () => {
    const response = await request(app.getHttpServer())
      .post('/oauth2/login')
      .send({accessToken: 'ya29.a0AWY7CklScH9wT0bDv8fpmu2-Y9LAN6fZCyAeZODqXetHmLODQV5J5rHOcD0zw_N3Zf1GOm0qme85uCIBM5VPlBFfLO1zjAA7kaQltkt2kgnFY2BiZESeKxIxR5jEKd61eJFpHWP5RRKaJeteE97KaQlAgzTJ_waCgYKAeESARASFQG1tDrpDIE0iRNLWXtQCFldJjA-Xw0165', server: OauthServerType.GOOGLE})
      .expect(200);

    console.log(response.body);
  });
});
