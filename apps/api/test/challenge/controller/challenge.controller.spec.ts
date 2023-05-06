import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {getConnection} from 'typeorm';
import {LocalDate, LocalDateTime} from 'js-joda';
import {Test, TestingModule} from '@nestjs/testing';
import {ApiModule} from '../../../src/api.module';
import {Challenge} from 'lib/entity/domains/challenge/challenge.entity';
import {Todo} from 'lib/entity/domains/todo/todo.entity';
import {TodoStatus} from 'lib/entity/domains/todo/todo-status.enum';

describe('ChallengeController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const repository = getConnection().getRepository(Challenge);
    await repository.save(new Challenge(1, 'memberId', LocalDateTime.now()));
  });

  afterEach(async () => {
    await getConnection().dropDatabase();
    await getConnection().close();
  });

  it('요청 받은 날짜의 커밋 횟수', async () => {
    const response = await request(app.getHttpServer())
      .get('/challenges/day/memberId')
      .query({
        day: LocalDate.now().toString(),
      })
      .expect(200);

    console.log(response.body);
  });

  it('요청 받은 달의 커밋 횟수 (각각 날마다)', async () => {
    const now = LocalDate.now().toString();
    const response = await request(app.getHttpServer())
      .get('/challenges/month/memberId')
      .query({
        day: now,
      })
      .expect(200);

    console.log(response.body);
  });

  it('커밋 상세 내역', async () => {
    const todoRepository = getConnection().getRepository(Todo);
    await todoRepository.save(new Todo('memberId', 'todo', LocalDate.now(), TodoStatus.COMPLETE));
    const now = LocalDate.now().toString();
    const response = await request(app.getHttpServer())
      .get('/challenges/history/memberId')
      .query({
        day: now,
      })
      .expect(200);

    console.log(response.body);
  });

  it('yyyy-mm-dd포맷이 아닐 경우 BadRequestException(400)', async () => {
    await request(app.getHttpServer())
      .get('/challenges/day/memberId')
      .query({
        day: '2022년12월25일',
      })
      .expect(400);
  });
});
