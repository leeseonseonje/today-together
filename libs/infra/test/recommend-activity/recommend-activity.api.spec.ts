import {Test, TestingModule} from '@nestjs/testing';
import {RecommendActivityApi} from 'lib/infra/recommend-activity/recommend-activity.api';
import {RecommendActivityInfraModule} from 'lib/infra/recommend-activity/recommend-activity-infra.module';
import {ActivityType} from 'lib/entity/domains/activity/activity.type.enum';
import {NotActivityException} from 'lib/infra/recommend-activity/not-activity.exception';

describe('RecommendTodoApi', () => {
  let sut: RecommendActivityApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RecommendActivityInfraModule],
    }).compile();

    sut = module.get<RecommendActivityApi>(RecommendActivityApi);
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
