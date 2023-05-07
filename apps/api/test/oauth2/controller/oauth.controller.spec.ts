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
      .send({accessToken: 'ya29.a0AWY7CkmE-WhvrRZUTtf0AvkuSQoemnHkeTMlq7Dpb9iBJf88Ua3cR_YHn0_pygPKWFiaiASNVMK8QFAnLo6ACQ1R3DCkrBAaxwKJGyEooEQ3X03U3yl4fbTErdKF2Zcdi5clGNFcYuQq6yZ_0wzXlUikpjic5QaCgYKAcASARASFQG1tDrpVrVr-CBe9rFPV3NppPrGbg0165', server: OauthServerType.GOOGLE})
      .expect(200);

    console.log(response.body);
  });
});
