import {Test, TestingModule} from '@nestjs/testing';
import {getConnection} from 'typeorm';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from '../../../../src/db/config';
import {TodoModule} from '../../../../src/app/todo/todo.module';
import {TodoService} from '../../../../src/app/todo/service/todo.service';
import {Todo} from '../../../../src/app/todo/domain/todo.entity';
import {TodoStatus} from '../../../../src/app/todo/domain/todo-status.enum';
import {LocalDate, LocalDateTime} from 'js-joda';
import {TodoRepository} from '../../../../src/app/todo/repository/todo.repository';
import {Challenge} from '../../../../src/app/challenge/challenge.entity';
import {ChallengeRepository} from '../../../../src/app/challenge/repository/challenge.repository';

describe('todo Service Integration Test', () => {

  let sut: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig), TodoModule],
    }).compile();

    sut = module.get<TodoService>(TodoService);
  });

  afterEach(async () => {
    await getConnection().dropDatabase();
    await getConnection().close();
  })

  it('complete 상태값 COMPLETE로 변경, commit, 그 날 최초 커밋 시 challenge save', async () => {
    const todo = await getConnection().getCustomRepository(TodoRepository)
      .save(new Todo(1, 'text1', LocalDate.now(), TodoStatus.INCOMPLETE));

    const result = await sut.complete(todo.id, 1) as Challenge;

    const findTodo = await getConnection().getCustomRepository(TodoRepository).findOne({
      where: {
        id: todo.id,
      }
    });
    expect(findTodo.status).toBe(TodoStatus.COMPLETE);
    expect(result.commits).toBe(1);
  });

  it('최초 커밋 아닐 시 challenge update (commits++)', async () => {
    const todo = await getConnection().getCustomRepository(TodoRepository)
      .save(new Todo(1, 'text1', LocalDate.now(), TodoStatus.INCOMPLETE));
    const challenge = await getConnection().getCustomRepository(ChallengeRepository)
      .save(new Challenge(todo.id, 1, 1, LocalDateTime.now()));

    const result = await sut.complete(todo.id, 1);

    const findChallenge = await getConnection().getCustomRepository(ChallengeRepository).findOne({
      where: {
        id: challenge.id,
      }
    });
    expect(findChallenge.commits).toBe(2);
  });

  it('오늘 할 일 목록 호출 미완료한 일정이 있으면 오늘 일정으로 자동 등록', async () => {
    await getConnection().getCustomRepository(TodoRepository).save(new Todo(1, 'text1', LocalDate.of(1, 8, 2), TodoStatus.INCOMPLETE));
    await getConnection().getCustomRepository(TodoRepository).save(new Todo(1, 'text2', LocalDate.of(100, 9, 6), TodoStatus.INCOMPLETE));
    await getConnection().getCustomRepository(TodoRepository).save(new Todo(1, 'text3', LocalDate.of(1000, 4, 1), TodoStatus.INCOMPLETE));
    await getConnection().getCustomRepository(TodoRepository).save(new Todo(1, 'text4', LocalDate.of(220, 1, 11), TodoStatus.INCOMPLETE));
    await getConnection().getCustomRepository(TodoRepository).save(new Todo(1, 'text5', LocalDate.of(486, 12, 21), TodoStatus.INCOMPLETE));
    await getConnection().getCustomRepository(TodoRepository).save(new Todo(1, 'text6', LocalDate.of(1486, 9, 22), TodoStatus.COMPLETE));
    await getConnection().getCustomRepository(TodoRepository).save(new Todo(1, 'text7', LocalDate.of(186, 10, 23), TodoStatus.COMPLETE));
    await getConnection().getCustomRepository(TodoRepository).save(new Todo(1, 'text8', LocalDate.of(286, 11, 24), TodoStatus.COMPLETE));
    await getConnection().getCustomRepository(TodoRepository).save(new Todo(1, 'text8', LocalDate.now(), TodoStatus.COMPLETE));
    await getConnection().getCustomRepository(TodoRepository).save(new Todo(1, 'text8', LocalDate.now(), TodoStatus.INCOMPLETE));

    const result = await sut.getTodayTodo(1);

    expect(result.length).toBe(7);
  });

  it('특정 날짜 할일 목록', async () => {
    await getConnection().getCustomRepository(TodoRepository).save(new Todo(1, 'text1', LocalDate.of(100, 1, 1), TodoStatus.INCOMPLETE));
    await getConnection().getCustomRepository(TodoRepository).save(new Todo(1, 'text2', LocalDate.of(100, 1, 1), TodoStatus.INCOMPLETE));
    await getConnection().getCustomRepository(TodoRepository).save(new Todo(1, 'text3', LocalDate.of(100, 1, 1), TodoStatus.INCOMPLETE));

    const result = await sut.getDayTodos(1, LocalDate.of(100, 1, 1));

    expect(result.length).toBe(3);
  });
});
