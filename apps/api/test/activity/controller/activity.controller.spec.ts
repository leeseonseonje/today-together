import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {ApiModule} from '../../../src/api.module';
import {getConnection} from 'typeorm';
import * as request from 'supertest';
import {ActivityType} from 'lib/entity/domains/activity/activity.type.enum';

describe('ActivityController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await getConnection().dropDatabase();
    await getConnection().close();
  });

  it('e2e 파라미터가 없을 경우', async () => {
    const response = await request(app.getHttpServer())
      .get('/activities');

    expect(response.status).toBe(200);
    expect('activity' in response.body).toBeTruthy();
    expect('type' in response.body).toBeTruthy();
    expect('participants' in response.body).toBeTruthy();
  });

  it('e2e 올바른 파라미터', async () => {
    const response = await request(app.getHttpServer())
      .get('/activities')
      .query({
        type: 'education'
      }).expect(200)

    expect(response.body.type).toBe(ActivityType.EDUCATION);
  });

  it('e2e 잘못된 파라미터', async () => {
    await request(app.getHttpServer())
      .get('/activities')
      .query({
        type: 'bad-request'
      }).expect(400)
  });
});
