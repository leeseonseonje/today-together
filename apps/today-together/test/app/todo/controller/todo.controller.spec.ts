import {TodoController} from '../../../../src/app/todo/controller/todo.controller';
import {Test, TestingModule} from '@nestjs/testing';
import {AppModule} from '../../../../src/app.module';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {getConnection} from 'typeorm';
import {Todo} from '../../../../src/app/todo/domain/todo.entity';
import {LocalDate} from 'js-joda';
import {TodoStatus} from '../../../../src/app/todo/domain/todo-status.enum';

describe('TodoController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const repository = getConnection().getRepository(Todo);
    await repository.save(new Todo(1, 'text', LocalDate.now(), TodoStatus.INCOMPLETE));
  });

  afterEach(async () => {
    await getConnection().dropDatabase();
    await getConnection().close();
  })

  it('오늘 할일 등록', async () => {
    const response = await request(app.getHttpServer())
      .post('/todos')
      .send({memberId: 1, text: 'text'})
      .expect(201);

    expect(Number(response.text)).toBe(2);
  });

  it('오늘 할일 수정', async () => {
    await request(app.getHttpServer())
      .patch('/todos')
      .send({todoId: 1, text: 'text2'})
      .expect(200);
  });

  it('오늘 할일 완료', async () => {
    await request(app.getHttpServer())
      .post('/todos/complete')
      .send({memberId: 1, todoId: 1})
      .expect(201);
  });

  it('할일 삭제', async () => {
    await request(app.getHttpServer())
      .delete('/todos/1')
      .expect(200);
  });

  it('오늘 할 일 목록', async () => {
    await request(app.getHttpServer())
      .get('/todos/today/1')
      .expect(200);
  });

  it('지정 날 할 일 목록', async () => {
    const now = LocalDate.now();
    await request(app.getHttpServer())
      .get('/todos/1')
      .query({ day: now.toString()})
      .expect(200);
  });
});
