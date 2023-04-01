import {Controller, Get, Query, UseFilters} from '@nestjs/common';
import {ActivityService} from '../service/ActivityService';
import {ActivityExceptionFilter} from '../exception/filter/ActivityExceptionFilter';
import {RequestActivityDto} from './dto/RequestActivityDto';

@Controller('/activity')
@UseFilters(ActivityExceptionFilter)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  async recommendToDo(@Query() request: RequestActivityDto) {
    return await this.activityService.recommendTodo(request.type);
  }
}
