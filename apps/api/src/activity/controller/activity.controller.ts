import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Controller, Get, Query, UseFilters} from '@nestjs/common';
import {ActivityExceptionFilter} from './filter/activity-exception.filter';
import {RequestActivityDto} from './dto/request-activity.dto';
import {ResponseActivityDto} from '../service/dto/response-activity.dto';
import {ActivityApiService} from '../service/activity-api.service';

@ApiTags('activity')
@Controller('/activities')
@UseFilters(ActivityExceptionFilter)
export class ActivityController {
  constructor(private readonly activityApiService: ActivityApiService) {}
  @ApiOperation({ summary: '할 일 추천(추천받을 할 일의 타입을 정하거나 정하지 않을 수 있음)' })
  @ApiResponse({
    status: 200,
    type: ResponseActivityDto,
  })
  @ApiResponse({
    status: 400,
    description: '할 일이 없습니다.',
  })
  @Get()
  async recommendToDo(@Query() request: RequestActivityDto) {
    return await this.activityApiService.recommendTodo(request.type);
  }
}
