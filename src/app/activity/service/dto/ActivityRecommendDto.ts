import {Activity} from '../../domain/Activity.entity';
import {ActivityType} from '../../domain/ActivityType';

export class ActivityRecommendDto {
  readonly activity: string;
  readonly type: ActivityType;
  readonly participants: number;


  constructor(activity: string, type: ActivityType, participants: number) {
    this.activity = activity;
    this.type = type;
    this.participants = participants;
  }

  static toDto(activity: Activity) {
    return new ActivityRecommendDto(activity.activity, activity.type, activity.participants);
  }
}
