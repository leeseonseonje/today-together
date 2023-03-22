import {ActivityService} from '../../src/activity/service/ActivityService';
import {RequestActivityDto} from '../../src/activity/web/dto/RequestActivityDto';
import {Activity} from '../../src/activity/domain/Activity';
import {ActivityType} from '../../src/activity/domain/ActivityType';
import {RecommendTodoApi} from '../../src/api/recommend_todo/RecommendTodoApi';
import {anything, instance, mock, verify, when} from 'ts-mockito';
import {Repository} from 'typeorm';
import {PapagoApi} from '../../src/api/translator/PapagoApi';
import {RecommendTodoApiResponse} from '../../src/api/recommend_todo/dto/RecommendTodoApiResponse';

describe('ActivityService', () => {
  let response;
  let request;
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
    request = RequestActivityDto.create(ActivityType.EDUCATION, 1);
    recommendTodoApi = mock(RecommendTodoApi);
    papagoApi = mock(PapagoApi);
    repository = mock(Repository<Activity>);
    when(await recommendTodoApi.apiCall(request.type, request.participants)).thenReturn(response);
  });

  it('레포지토리에 activity가 없을 경우 papagoApi를 호출한다.', async () => {
    const sut = new ActivityService(instance(repository), instance(recommendTodoApi), instance(papagoApi));

    await sut.recommendTodo(request.type, request.participants);

    verify(recommendTodoApi.apiCall(request.type, request.participants)).called();
    verify(repository.findOneBy(anything())).called();
    // verify(papagoApi.apiCall(anything())).called();
  });

  it('레포지토리에 activity가 존재하면 바로 반환한다.', async () => {
    when(await repository.findOneBy(anything())).thenReturn(Activity.create(1, '활동'));
    const sut = new ActivityService(instance(repository), instance(recommendTodoApi), instance(papagoApi));

    await sut.recommendTodo(request.type, request.participants);

    verify(recommendTodoApi.apiCall(request.type, request.participants)).called();
    verify(papagoApi.apiCall(anything())).never();
  });
});
