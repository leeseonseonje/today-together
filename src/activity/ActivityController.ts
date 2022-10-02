import {Body, Controller, Post, UseFilters} from "@nestjs/common";
import {RequestActivityDto} from "./RequestActivityDto";
import {ActivityService} from "./ActivityService";
import {ActivityExceptionFilter} from "./ActivityExceptionFilter";

@Controller('/activity')
@UseFilters(ActivityExceptionFilter)
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