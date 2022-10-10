import {ActivityService} from "../../src/activity/ActivityService";
import {RequestActivityDto} from "../../src/activity/RequestActivityDto";
import {Activity} from "../../src/activity/Activity";
import {ActivityType} from "../../src/activity/ActivityType";
import {RecommendTodoApi} from "../../src/activity/api/RecommendTodoApi";
import {anything, instance, mock, verify, when} from "ts-mockito";
import {Repository} from "typeorm";
import {PapagoApi} from "../../src/activity/api/translator/PapagoApi";
import {RecommendTodoApiResponse} from "../../src/activity/api/dto/RecommendTodoApiResponse";

describe('ActivityService', () => {

    let response;
    let request;
    let recommendTodoApi;
    let papagoApi;
    let repository;

    beforeEach(async () => {
        response = new RecommendTodoApiResponse('activity', 1, 'type', 2, 1, 1);
        request = new RequestActivityDto(ActivityType.EDUCATION, 1);
        recommendTodoApi = mock(RecommendTodoApi);
        papagoApi = mock(PapagoApi);
        repository = mock(Repository<Activity>);
    });

    it('레포지토리에 activity가 없을 경우 papagoApi를 호출한다.', async () => {
        when(await recommendTodoApi.apiCall(anything())).thenReturn(response as RecommendTodoApiResponse);
        const sut = new ActivityService(instance(repository), instance(recommendTodoApi), instance(papagoApi));

        await sut.recommendTodo(request);

        verify(recommendTodoApi.apiCall(anything())).called();
        verify(repository.findOneBy(anything())).called();
        verify(papagoApi.apiCall(anything())).called();
    });

    it('레포지토리에 activity가 존재하면 바로 반환한다.', async () => {
        when(await recommendTodoApi.apiCall(anything())).thenReturn(response as RecommendTodoApiResponse);
        when(await repository.findOneBy(anything())).thenReturn(Activity.create(1, '활동'));
        const sut = new ActivityService(instance(repository), instance(recommendTodoApi), instance(papagoApi));

        await sut.recommendTodo(request);

        verify(recommendTodoApi.apiCall(anything())).called();
        verify(papagoApi.apiCall(anything())).never();
    });
});