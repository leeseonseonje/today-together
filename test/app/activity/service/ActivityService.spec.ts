import {ActivityService} from '../../../../src/app/activity/service/ActivityService';
import {Activity} from '../../../../src/app/activity/domain/Activity.entity';
import {ActivityType} from '../../../../src/app/activity/domain/ActivityType';
import {RecommendTodoApi} from '../../../../src/app/activity/api/RecommendTodoApi';
import {anything, instance, mock, verify, when} from 'ts-mockito';
import {Repository} from 'typeorm';
import {PapagoApi} from '../../../../src/app/translator/PapagoApi';
import {RecommendTodoApiResponse} from '../../../../src/app/activity/api/dto/RecommendTodoApiResponse';
import {TranslatorApi} from '../../../../src/app/translator/TranslatorApi';

describe('ActivityService', () => {
  let response: RecommendTodoApiResponse;
  let activityType: ActivityType;
  let recommendTodoApi: RecommendTodoApi;
  let papagoApi: TranslatorApi;
  let repository: Repository<Activity>;

  beforeEach(async () => {
    response = {
      key: 1,
      activity: 'activity',
      type: 'type',
      participants: 2,
    };
    activityType = ActivityType.EDUCATION;
    recommendTodoApi = mock(RecommendTodoApi);
    papagoApi = mock(PapagoApi);
    repository = mock(Repository<Activity>);
    when(await recommendTodoApi.recommendTodo(activityType)).thenReturn(response);
  });

  it('레포지토리에 activity가 없을 경우 번역api를 호출한다.', async () => {
    const sut = new ActivityService(instance(repository), instance(recommendTodoApi), instance(papagoApi));

    await sut.recommendTodo(activityType);

    verify(recommendTodoApi.recommendTodo(activityType)).called();
    verify(repository.findOneBy(anything())).called();
    verify(papagoApi.translation(anything())).called();
  });

  it('레포지토리에 activity가 존재하면 번역api를 호출하지 않고 바로 반환한다.', async () => {
    when(await repository.findOneBy(anything())).thenReturn(Activity.of(1, '활동'));
    const sut = new ActivityService(instance(repository), instance(recommendTodoApi), instance(papagoApi));

    await sut.recommendTodo(activityType);

    verify(recommendTodoApi.recommendTodo(activityType)).called();
    verify(papagoApi.translation(anything())).never();
  });
});
