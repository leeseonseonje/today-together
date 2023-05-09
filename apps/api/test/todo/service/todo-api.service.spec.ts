import {TodoApiService} from '../../../src/todo/service/todo-api.service';
import {Test, TestingModule} from '@nestjs/testing';
import {TodoApiModule} from '../../../src/todo/todo-api.module';
import {getConnection, getManager} from 'typeorm';
import {LocalDate} from 'js-joda';
import {TodoStatus} from 'lib/entity/domains/todo/todo-status.enum';
import {Todo} from 'lib/entity/domains/todo/todo.entity';
import {initDbModule} from 'lib/common/config/module-config';

describe('Todo Api Service Integration Test', () => {

  let sut: TodoApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [initDbModule, TodoApiModule],
    }).compile()

    sut = module.get<TodoApiService>(TodoApiService);
  });

  afterEach(async () => {
    await getConnection().close();
  })

  it('오늘 할 일 목록 호출 미완료한 일정이 있으면 오늘 일정으로 자동 등록', async () => {
    await getConnection().getRepository(Todo).save(new Todo('memberId', 'text1', LocalDate.of(2000, 8, 2), TodoStatus.INCOMPLETE));
    await getConnection().getRepository(Todo).save(new Todo('memberId', 'text2', LocalDate.of(2001, 9, 6), TodoStatus.INCOMPLETE));
    await getConnection().getRepository(Todo).save(new Todo('memberId', 'text3', LocalDate.of(2002, 4, 1), TodoStatus.INCOMPLETE));
    await getConnection().getRepository(Todo).save(new Todo('memberId', 'text4', LocalDate.of(2003, 1, 11), TodoStatus.INCOMPLETE));
    await getConnection().getRepository(Todo).save(new Todo('memberId', 'text5', LocalDate.of(2004, 12, 21), TodoStatus.INCOMPLETE));
    await getConnection().getRepository(Todo).save(new Todo('memberId', 'text8', LocalDate.now(), TodoStatus.COMPLETE));
    await getConnection().getRepository(Todo).save(new Todo('memberId', 'text8', LocalDate.now(), TodoStatus.INCOMPLETE));

    const result = await sut.getTodayTodos('memberId');

    expect(result).toHaveLength(7);
  });

  it('특정 날짜 할일 목록', async () => {
    await getConnection().getRepository(Todo).save(new Todo('memberId', 'text1', LocalDate.of(2000, 1, 1), TodoStatus.INCOMPLETE));
    await getConnection().getRepository(Todo).save(new Todo('memberId', 'text2', LocalDate.of(2000, 1, 1), TodoStatus.INCOMPLETE));
    await getConnection().getRepository(Todo).save(new Todo('memberId', 'text3', LocalDate.of(2000, 1, 1), TodoStatus.INCOMPLETE));

    const result = await sut.getDayTodos('memberId', LocalDate.of(2000, 1, 1));

    expect(result).toHaveLength(3);
  });
});
