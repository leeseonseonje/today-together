import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {getConnection} from 'typeorm';
import {LocalDate} from 'js-joda';
import {ApiModule} from '../../../src/api.module';
import {Todo} from 'lib/entity/domains/todo/todo.entity';
import {TodoStatus} from 'lib/entity/domains/todo/todo-status.enum';

describe('TodoController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const repository = getConnection().getRepository(Todo);
    await repository.save(new Todo('1', 'text', LocalDate.now(), TodoStatus.INCOMPLETE));
  });

  afterEach(async () => {
    await getConnection().dropDatabase();
    await getConnection().close();
  })

  it('오늘 할일 등록', async () => {
    const response = await request(app.getHttpServer())
      .post('/todos')
      .send({memberId: '1', text: 'text'})
      .expect(201);

    console.log(response.body);
  });

  it('오늘 할일 수정', async () => {
    const response = await request(app.getHttpServer())
      .patch('/todos')
      .send({todoId: 1, text: 'text2'})
      .expect(200);

    console.log(response.body);
  });

  it('오늘 할일 완료', async () => {
    const response = await request(app.getHttpServer())
      .post('/todos/complete')
      .send({memberId: '1', todoId: 1})
      .expect(200);

    console.log(response.body);
  });

  it('할일 삭제', async () => {
    await request(app.getHttpServer())
      .delete('/todos/1')
      .expect(200);
  });

  it('오늘 할 일 목록', async () => {
    const response = await request(app.getHttpServer())
      .get('/todos/today/1')
      .expect(200);

    console.log(response.body);
  });

  it('지정 날 할 일 목록', async () => {
    const now = LocalDate.now().toString();
    const response = await request(app.getHttpServer())
      .get('/todos/1')
      .query({day: now})
      .expect(200);

    console.log(response.body);
  });

  it('쿼리가 yyyy-mm-dd포맷이 아닐 경우 BadRequestException(400)', async () => {
    await request(app.getHttpServer())
      .get('/todos/1')
      .query({day: '2022년 12월 25일'})
      .expect(400);
  });
});
