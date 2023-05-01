import {TodoController} from '../../../../src/app/todo/controller/todo.controller';
import {Test, TestingModule} from '@nestjs/testing';
import {AppModule} from '../../../../src/app.module';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {getConnection} from 'typeorm';
import {LocalDate, LocalDateTime} from 'js-joda';
import {Challenge} from '../../../../src/app/challenge/challenge.entity';

describe('ChallengeController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await getConnection().close();
  });

  it('요청 받은 날짜의 커밋 횟수', async () => {
    await request(app.getHttpServer())
      .get('/challenges/day/1')
      .query({
        day: LocalDate.now().toString(),
      })
      .expect(200);
  });

  it('요청 받은 달의 커밋 횟수 (각각 날마다)', async () => {
    await request(app.getHttpServer())
      .get('/challenges/month/1')
      .query({
        day: LocalDate.now().toString(),
      })
      .expect(200);
  });

  it('커밋 상세 내역', async () => {
    await request(app.getHttpServer())
      .get('/challenges/history/1')
      .query({
        day: LocalDate.now().toString(),
      })
      .expect(200);
  });
});
