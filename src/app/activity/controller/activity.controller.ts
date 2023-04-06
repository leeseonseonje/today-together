import {Controller, Get, Query, UseFilters} from '@nestjs/common';
import {ActivityService} from '../service/activity.service';
import {ActivityExceptionFilter} from '../exception/filter/activity-exception.filter';
import {RequestActivityDto} from './dto/request-activity.dto';

@Controller('/activity')
@UseFilters(ActivityExceptionFilter)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  async recommendToDo(@Query() request: RequestActivityDto) {
    return await this.activityService.recommendTodo(request.type);
  }
}
