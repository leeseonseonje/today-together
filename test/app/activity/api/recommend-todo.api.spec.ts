import {Test, TestingModule} from '@nestjs/testing';
import {RecommendTodoApi} from '../../../../src/app/activity/api/recommend-todo.api';
import {ActivityType} from '../../../../src/app/activity/domain/activity.type.enum';
import {HttpModule} from '@nestjs/axios';
import {NotActivityException} from '../../../../src/app/activity/exception/not-activity.exception';

describe('RecommendTodoApi', () => {
  let sut: RecommendTodoApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [RecommendTodoApi],
    }).compile();

    sut = module.get<RecommendTodoApi>(RecommendTodoApi);
  });

  it('recommend todo api 호출', async () => {
    let result = await sut.recommendTodo(ActivityType.EDUCATION);

    expect(result.type).toBe('education');
  });

  it('잘못된 type을 전달하면 NotActivityException 발생', async () => {
    const type = 'error' as ActivityType;
    await expect(async () => await sut.recommendTodo(type)).rejects.toThrowError(NotActivityException);
  });
});
