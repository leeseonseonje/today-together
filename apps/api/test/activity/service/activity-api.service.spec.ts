import {ResponseRecommendTodoApiDto} from 'lib/infra/recommend-activity/dto/response-recommend-todo-api.dto';
import {ActivityType} from 'lib/entity/domains/activity/activity.type.enum';
import {RecommendActivityApi} from 'lib/infra/recommend-activity/recommend-activity.api';
import {TranslatorApi} from 'lib/infra/translator/translator.api';
import {ActivityApiService} from '../../../src/activity/service/activity-api.service';
import {Test, TestingModule} from '@nestjs/testing';
import {anything, instance, mock, verify, when} from 'ts-mockito';
import {getConnection} from 'typeorm';
import {PapagoApi} from 'lib/infra/translator/papago.api';
import {Activity} from 'lib/entity/domains/activity/activity.entity';
import {ActivityApiModule} from '../../../src/activity/activity-api.module';
import {initDbModule} from 'lib/common/config/module-config';

describe('Activity Api Service Integration Test', () => {

  let response: ResponseRecommendTodoApiDto;
  let activityType: ActivityType;
  let recommendActivityApi: RecommendActivityApi;
  let papagoApi: TranslatorApi;
  let sut: ActivityApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [initDbModule, ActivityApiModule],
    }).compile()

    response = {
      key: 1,
      activity: 'activity',
      type: ActivityType.EDUCATION,
      participants: 2,
    };
    activityType = ActivityType.EDUCATION;
    recommendActivityApi = mock(RecommendActivityApi);
    papagoApi = mock(PapagoApi);

    await getConnection().query("delete from activity where id = ?", [1]);
    when(await recommendActivityApi.recommendTodo(ActivityType.EDUCATION)).thenReturn(response)
    sut = new ActivityApiService(instance(recommendActivityApi), instance(papagoApi));
  });

  afterEach(async () => {
    await getConnection().close();
  });

  it('레포지토리에 activity가 없을 경우 번역api를 호출한다.', async () => {
    when(await papagoApi.translation('activity')).thenReturn('활동');

    const result = await sut.recommendTodo(activityType);

    expect(result.activity).toBe('활동');
    expect(result.participants).toBe(2);
    expect(result.type).toBe(ActivityType.EDUCATION);
    verify(recommendActivityApi.recommendTodo(activityType)).called();
    verify(papagoApi.translation(anything())).called();
  });

  it('레포지토리에 activity가 존재하면 번역api를 호출하지 않고 바로 반환한다.', async () => {
    await getConnection().getRepository(Activity)
      .save(new Activity(1, '활동', ActivityType.EDUCATION, 1));

    const result = await sut.recommendTodo(activityType);

    expect(result.activity).toBe('활동');
    expect(result.type).toBe(ActivityType.EDUCATION);
    expect(result.participants).toBe(1);
    verify(recommendActivityApi.recommendTodo(activityType)).called();
    verify(papagoApi.translation(anything())).never();
  });
});
