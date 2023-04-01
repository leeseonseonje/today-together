import {ActivityType} from '../../domain/ActivityType';

export interface RecommendTodoApiDto {
  readonly key: number
  readonly activity: string,
  readonly type: ActivityType,
  readonly participants: number,
  readonly error?: string
}
