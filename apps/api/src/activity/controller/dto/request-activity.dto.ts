import {ApiProperty} from '@nestjs/swagger';
import {ActivityType} from 'lib/entity/domains/activity/activity.type.enum';
import {IsEnum} from 'class-validator';

export class RequestActivityDto {

  @ApiProperty({
    example: 'education',
    description: '할 일 종류(교육, DIY, 음악, 휴식, 요리 등)',
    required: false
  })
  @IsEnum(ActivityType)
  readonly type: ActivityType;
}
