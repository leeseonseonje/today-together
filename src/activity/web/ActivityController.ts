import { Body, Controller, Post, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { RequestActivityDto } from './dto/RequestActivityDto';
import { ActivityService } from '../service/ActivityService';
import { ActivityExceptionFilter } from './ActivityExceptionFilter';

@Controller('/activity')
@UsePipes(ValidationPipe)
@UseFilters(ActivityExceptionFilter)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  async recommendToDo(@Body() request: RequestActivityDto) {
    const result = await this.activityService.recommendTodo(request.type, request.participants);
    return result.activity;
  }
}
