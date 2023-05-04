import {ActivityType} from '../../domain/activity.type.enum';

export interface ResponseRecommendTodoApiDto {
  readonly key: number
  readonly activity: string,
  readonly type: ActivityType,
  readonly participants: number,
  readonly error?: string
}
