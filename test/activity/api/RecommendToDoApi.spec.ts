import {Test, TestingModule} from "@nestjs/testing";
import {RecommendToDoApi} from "../../../src/activity/api/RecommendToDoApi";
import {RequestActivityDto} from "../../../src/activity/RequestActivityDto";
import {ActivityType} from "../../../src/activity/ActivityType";
import {HttpModule} from "@nestjs/axios";
import {BadRequestException} from "@nestjs/common";

describe('RecommendToDoApi', () => {

    let api: RecommendToDoApi;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [RecommendToDoApi]
        }).compile();

        api = module.get<RecommendToDoApi>(RecommendToDoApi);
    });

    it('apiCall', async () => {
        const activityDto = new RequestActivityDto(ActivityType.EDUCATION, 1);
        let result = await api.apiCall(activityDto);
        expect(result.type).toBe("education");
        expect(result.participants).toBe(1);
    });

    it('apiError', async () => {
        const activityDto = new RequestActivityDto(ActivityType.EDUCATION, 1000);
        await expect(async () => await api.apiCall(activityDto))
            .rejects.toThrowError(BadRequestException);
    });
});