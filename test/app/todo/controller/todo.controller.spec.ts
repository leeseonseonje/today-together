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

    expect(Number(response.text)).toBe(1);
  });

  it('오늘 할일 수정', async () => {
    const repository = getConnection().getRepository(Todo);
    await repository.save(new Todo(1, 'text', LocalDate.now(), TodoStatus.INCOMPLETE));
    const response = await request(app.getHttpServer())
      .patch('/todos')
      .send({todoId: 1, text: 'text2'})
      .expect(200);

    console.log(response);
    console.log(response.body);
  });
});
