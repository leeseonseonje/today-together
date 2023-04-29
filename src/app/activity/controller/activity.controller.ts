import {Controller, Get, Query, UseFilters, UsePipes, ValidationPipe} from '@nestjs/common';
import {ActivityService} from '../service/activity.service';
import {ActivityExceptionFilter} from '../exception/filter/activity-exception.filter';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {RequestActivityDto} from './dto/request-activity.dto';
import {ResponseActivityDto} from '../service/dto/response-activity.dto';

@ApiTags('activity')
@Controller('/activities')
@UseFilters(ActivityExceptionFilter)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @ApiResponse({
    status: 400,
    description: '할 일이 없습니다.',
  })
  @ApiResponse({
    status: 200,
    type: ResponseActivityDto,
  })
  @Get()
  async recommendToDo(@Query() request: RequestActivityDto) {
    return await this.activityService.recommendTodo(request.type);
  }
}
