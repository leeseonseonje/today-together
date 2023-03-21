export class RecommendTodoApiResponse {
  readonly activity: string;
  readonly accessibility: number;
  readonly type: string;
  readonly participants: number;
  readonly price: number;
  readonly key: number;


  private constructor(activity: string, accessibility: number, type: string, participants: number, price: number, key: number) {
    this.activity = activity;
    this.accessibility = accessibility;
    this.type = type;
    this.participants = participants;
    this.price = price;
    this.key = key;
  }

  static create(data: any) {
    return new RecommendTodoApiResponse(data.activity, data.accessibilty, data.type, data.participants, data.price, data.key)
  }
}
