import * as request from 'supertest';
import {PushModule} from '../../../src/push.module';
import {e2eTestConfig, TestApplication} from '../../../../../libs/common/test/test-config';
import {getConnection} from 'typeorm';

describe('PushController (e2e)', () => {
  let test: TestApplication;

  beforeEach(async () => {
    test = await e2eTestConfig(PushModule);
  });

  it('push 토큰 저장', async () => {
    await request(test.app.getHttpServer())
      .post('/push/token')
      .send({
        token: 'token',
        memberId: 'memberId'
      })
      .expect(201);
  });
});
