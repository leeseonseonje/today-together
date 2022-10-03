import {Body, Controller, Post, UseFilters, UsePipes, ValidationPipe} from "@nestjs/common";
import {RequestActivityDto} from "./RequestActivityDto";
import {ActivityService} from "./ActivityService";
import {ActivityExceptionFilter} from "./ActivityExceptionFilter";

@Controller('/activity')
@UsePipes(ValidationPipe)
@UseFilters(ActivityExceptionFilter)
export class ActivityController {
    constructor(
        private readonly activityService: ActivityService,
    ) {
    }

    @Post()
    async recommendToDo(@Body() request: RequestActivityDto) {
        const result = await this.activityService.recommendToDo(request);
        return result.activity;
    }
}