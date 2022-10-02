import {RequestActivityDto} from "../../src/activity/RequestActivityDto";
import {ActivityType} from "../../src/activity/ActivityType";

describe('RequestActivityDto', () => {

    it('parameterBuild', async () => {
        const activityDto = new RequestActivityDto(ActivityType.EDUCATION, 2,);
    });
});