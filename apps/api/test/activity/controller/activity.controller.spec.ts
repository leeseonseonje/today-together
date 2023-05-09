import {getConnection} from 'typeorm';
import * as request from 'supertest';
import {ActivityType} from 'lib/entity/domains/activity/activity.type.enum';
import {e2eTestConfig, TestApplication} from '../../../../../libs/common/test/test-config';
import {ApiModule} from '../../../src/api.module';

describe('ActivityController (e2e)', () => {
  let test: TestApplication;

  beforeEach(async () => {
    test = await e2eTestConfig(ApiModule);
  });

  afterEach(async () => {
    await getConnection().close();
  });

  it('쿼리파라미터: activity type 전체(all)', async () => {
    const response = await request(test.app.getHttpServer())
      .get('/activities')
      .query({type: ActivityType.ALL});

    expect(response.status).toBe(200);
    expect('activity' in response.body).toBeTruthy();
    expect('type' in response.body).toBeTruthy();
    expect('participants' in response.body).toBeTruthy();
  });

  it('쿼리파라미터: activitiy type', async () => {
    const response = await request(test.app.getHttpServer())
      .get('/activities')
      .query({
        type: ActivityType.EDUCATION
      }).expect(200)

    expect(response.body.type).toBe(ActivityType.EDUCATION);
  });

  it('type파라미터가 없거나, ActivityType(enum)이 아닐 경우 BadRequest(400)', async () => {
    await request(test.app.getHttpServer())
      .get('/activities')
      .query({
        type: 'bad-request'
      }).expect(400)
  });
});
