import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {ActivityType} from '../../src/activity/ActivityType';
import {AppModule} from '../../src/app.module';

describe('ActivityController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('e2e', () => {
    return request(app.getHttpServer())
      .post('/activity')
      .send({
        type: ActivityType.EDUCATION,
        participants: 1,
      })
      .expect(201);
  });

  it('e2e', () => {
    return request(app.getHttpServer())
      .post('/activity')
      .send({
        type: ActivityType.EDUCATION,
        participants: 999999999,
      })
      .expect(400);
  });
});
