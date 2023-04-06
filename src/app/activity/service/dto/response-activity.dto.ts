import {Activity} from '../../domain/activity.entity';
import {ActivityType} from '../../domain/activity.type.enum';

export class ResponseActivityDto {
  readonly activity: string;
  readonly type: ActivityType;
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
