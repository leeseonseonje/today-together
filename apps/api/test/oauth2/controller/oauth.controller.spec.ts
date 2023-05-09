import * as request from 'supertest';
import {getConnection} from 'typeorm';
import {OauthServerType} from 'lib/infra/oauth2/enum/oauth-server-type.enum';
import {e2eTestConfig, TestApplication} from '../../../../../libs/common/test/test-config';
import {ApiModule} from '../../../src/api.module';

describe('OauthController', () => {
  let test: TestApplication;

  beforeEach(async () => {
    test = await e2eTestConfig(ApiModule);
  });

  afterEach(async () => {
    //await getConnection().dropDatabase();
    await getConnection().close();
  });

  it('accessToken 발급', async () => {
    const response = await request(test.app.getHttpServer())
      .post('/oauth2/token')
      .send({code: '4/0AbUR2VO_DG4ZMZUKW-i8iV3Ohg6Mh-thP3aGVgLt0felFqeWEdxk_OkniHe26mlyNegsfg', server: OauthServerType.GOOGLE})
      .expect(200);

    console.log(response.body);
  });

  it('accessToken으로 사용자 정보 반환', async () => {
    const response = await request(test.app.getHttpServer())
      .post('/oauth2/login')
      .send({accessToken: 'ya29.a0AWY7CknQjuWaMwnt3Os8Pw0csuavYd40TXF9YBQzQfSDs025a6NBK3PxOdtkPOs8inpcVJDmUWxNJCS-f0OzY23fm4H4cj5XKB0iamSb4voP-IamSdQIbSZEphriDTlVyFcyJxPpAit_2K13LlsdrNxZ2rCo8gaCgYKAQ4SARASFQG1tDrpicXqahQgr9H98VKZ9BlqyA0165', server: OauthServerType.GOOGLE})
      .expect(200);

    console.log(response.body);
  });
});
