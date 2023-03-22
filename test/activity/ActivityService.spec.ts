import {ActivityService} from '../../src/activity/service/ActivityService';
import {Activity} from '../../src/activity/domain/Activity';
import {ActivityType} from '../../src/activity/domain/ActivityType';
import {RecommendTodoApi} from '../../src/api/recommend_todo/RecommendTodoApi';
import {anything, instance, mock, verify, when} from 'ts-mockito';
import {Repository} from 'typeorm';
import {PapagoApi} from '../../src/api/translator/PapagoApi';
import {RecommendTodoApiResponse} from '../../src/api/recommend_todo/dto/RecommendTodoApiResponse';

describe('ActivityService', () => {
  let response;
  let activityType;
  let recommendTodoApi;
  let papagoApi;
  let repository;

  beforeEach(async () => {
    response = RecommendTodoApiResponse.create({
      activity: 'activity',
      accessibilty: 1,
      type: 'type',
      participants: 2,
      price: 1,
      key: 1
    });
    activityType = ActivityType.EDUCATION;
    recommendTodoApi = mock(RecommendTodoApi);
    papagoApi = mock(PapagoApi);
    repository = mock(Repository<Activity>);
    when(await recommendTodoApi.apiCall(activityType)).thenReturn(response);
  });

  it('레포지토리에 activity가 없을 경우 번역api를 호출한다.', async () => {
    const sut = new ActivityService(instance(repository), instance(recommendTodoApi), instance(papagoApi));

    await sut.recommendTodo(activityType);

    verify(recommendTodoApi.apiCall(activityType)).called();
    verify(repository.findOneBy(anything())).called();
    verify(papagoApi.apiCall(anything())).called();
  });

  it('레포지토리에 activity가 존재하면 번역api를 호출하지 않고 바로 반환한다.', async () => {
    when(await repository.findOneBy(anything())).thenReturn(Activity.create(1, '활동'));
    const sut = new ActivityService(instance(repository), instance(recommendTodoApi), instance(papagoApi));

    await sut.recommendTodo(activityType);

    verify(recommendTodoApi.apiCall(activityType)).called();
    verify(papagoApi.apiCall(anything())).never();
  });
});
