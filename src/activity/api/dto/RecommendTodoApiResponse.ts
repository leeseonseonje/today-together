export class RecommendTodoApiResponse {
    readonly activity: string;
    readonly accessibility: number;
    readonly type: string;
    readonly participants: number;
    readonly price: number;
    readonly key: number;


    constructor(activity: string, accessibility: number, type: string, participants: number, price: number, key: number) {
        this.activity = activity;
        this.accessibility = accessibility;
        this.type = type;
        this.participants = participants;
        this.price = price;
        this.key = key;
    }
}