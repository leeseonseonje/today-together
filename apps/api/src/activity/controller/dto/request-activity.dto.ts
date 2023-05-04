import {ActivityType} from '../../../../../today-together/src/app/activity/domain/activity.type.enum';
import {ApiProperty} from '@nestjs/swagger';

export class RequestActivityDto {

  @ApiProperty({
    example: 'education',
    description: '할 일 종류(교육, DIY, 음악, 휴식, 요리 등)',
    required: false
  })
  readonly type: ActivityType;
}
