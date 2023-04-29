import {Activity} from '../../domain/activity.entity';
import {ActivityType} from '../../domain/activity.type.enum';
import {ApiProperty} from '@nestjs/swagger';

export class ResponseActivityDto {

  @ApiProperty({
    example: '자바스크립트 배우기',
    description: '추천받은 할 일',
  })
  readonly activity: string;

  @ApiProperty({
    example: 'education',
    description: '할 일 종류(교육, DIY, 음악, 휴식, 요리 등)',
  })
  readonly type: ActivityType;

  @ApiProperty({
    example: '1',
    description: '권장 인원',
  })
  readonly participants: number;


  constructor(activity: string, type: ActivityType, participants: number) {
    this.activity = activity;
    this.type = type;
    this.participants = participants;
  }

  static toDto(activity: Activity) {
    return new ResponseActivityDto(activity.activity, activity.type, activity.participants);
  }
}
