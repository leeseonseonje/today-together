import * as request from 'supertest';
import {getConnection} from 'typeorm';
import {OauthServerType} from 'lib/infra/oauth2/enum/oauth-server-type.enum';
import {e2eTestConfig, TestApplication} from '../../test-config';

describe('OauthController', () => {
  let test: TestApplication;

  beforeEach(async () => {
    test = await e2eTestConfig();
  });

  afterEach(async () => {
    await getConnection().dropDatabase();
    await getConnection().close();
  });

  it('accessToken 발급', async () => {
    const response = await request(test.app.getHttpServer())
      .post('/oauth2/token')
      .send({code: '4/0AbUR2VN9egDxSBgI1_2lVUf8UbMV54uOJ-z3pl8MWpd5h71GMGOX0NrRuCOJ-OS7GVcbbA', server: OauthServerType.GOOGLE})
      .expect(200);

    console.log(response.body);
  });

  it('accessToken으로 사용자 정보 반환', async () => {
    const response = await request(test.app.getHttpServer())
      .post('/oauth2/login')
      .send({accessToken: 'ya29.a0AWY7CklScH9wT0bDv8fpmu2-Y9LAN6fZCyAeZODqXetHmLODQV5J5rHOcD0zw_N3Zf1GOm0qme85uCIBM5VPlBFfLO1zjAA7kaQltkt2kgnFY2BiZESeKxIxR5jEKd61eJFpHWP5RRKaJeteE97KaQlAgzTJ_waCgYKAeESARASFQG1tDrpDIE0iRNLWXtQCFldJjA-Xw0165', server: OauthServerType.GOOGLE})
      .expect(200);

    console.log(response.body);
  });
});
