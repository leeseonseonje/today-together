import {ActivityService} from '../../../../src/app/activity/service/ActivityService';
import {ActivityType} from '../../../../src/app/activity/domain/ActivityType';
import {RecommendTodoApi} from '../../../../src/app/activity/api/RecommendTodoApi';
import {anything, instance, mock, verify, when} from 'ts-mockito';
import {PapagoApi} from '../../../../src/app/translator/PapagoApi';
import {RecommendTodoApiDto} from '../../../../src/app/activity/api/dto/RecommendTodoApiDto';
import {TranslatorApi} from '../../../../src/app/translator/TranslatorApi';
import {Test, TestingModule} from '@nestjs/testing';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from '../../../../src/db/config';
import {ActivityModule} from '../../../../src/app/activity/ActivityModule';
import {getConnection} from 'typeorm';
import {Activity} from '../../../../src/app/activity/domain/Activity.entity';

describe('ActivityService', () => {
  let response: RecommendTodoApiDto;
  let activityType: ActivityType;
  let recommendTodoApi: RecommendTodoApi;
  let papagoApi: TranslatorApi;
  let sut: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig), ActivityModule],
    }).compile();

    response = {
      key: 1,
      activity: 'activity',
      type: ActivityType.EDUCATION,
      participants: 2,
    };
    activityType = ActivityType.EDUCATION;
    recommendTodoApi = mock(RecommendTodoApi);
    papagoApi = mock(PapagoApi);

    await getConnection().query("delete from activity where id = ?", [1]);
    when(await recommendTodoApi.recommendTodo(ActivityType.EDUCATION)).thenReturn(response)
    sut = new ActivityService(instance(recommendTodoApi), instance(papagoApi));
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
    verify(recommendTodoApi.recommendTodo(activityType)).called();
    verify(papagoApi.translation(anything())).called();
  });

  it('레포지토리에 activity가 존재하면 번역api를 호출하지 않고 바로 반환한다.', async () => {
    await getConnection().getRepository(Activity)
      .save(new Activity(1, '활동', ActivityType.EDUCATION, 1));

    const result = await sut.recommendTodo(activityType);

    expect(result.activity).toBe('활동');
    expect(result.type).toBe(ActivityType.EDUCATION);
    expect(result.participants).toBe(1);
    verify(recommendTodoApi.recommendTodo(activityType)).called();
    verify(papagoApi.translation(anything())).never();
  });
});
