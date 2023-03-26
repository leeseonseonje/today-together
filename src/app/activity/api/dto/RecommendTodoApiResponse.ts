export interface RecommendTodoApiResponse {
  readonly key: number
  readonly activity: string,
  readonly type: string,
  readonly participants: number,
  readonly error?: string
}
