import {Body, Controller, Post} from "@nestjs/common";
import {RequestActivityDto} from "./RequestActivityDto";
import {ActivityService} from "./ActivityService";

@Controller('/activity')
export class ActivityController {
    constructor(
        private readonly activityService: ActivityService,
    ) {
    }

    @Post()
    async recommendToDo(@Body() request: RequestActivityDto) {
        const requestDto = RequestActivityDto.create(request);
        const result = await this.activityService.recommendToDo(requestDto);
        return result.activity;
    }
}