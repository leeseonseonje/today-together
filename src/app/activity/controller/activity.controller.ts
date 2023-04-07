import {Controller, Get, Query, UseFilters} from '@nestjs/common';
import {ActivityService} from '../service/activity.service';
import {ActivityExceptionFilter} from '../exception/filter/activity-exception.filter';
import {ActivityType} from '../domain/activity.type.enum';

@Controller('/activities')
@UseFilters(ActivityExceptionFilter)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  async recommendToDo(@Query() request: { type: ActivityType }) {
    return await this.activityService.recommendTodo(request.type);
  }
}
