import {ActivityType} from "./ActivityType";

export class RequestActivityDto {
    readonly type: ActivityType = ActivityType.ETC;
    readonly participants: number = 1;

    constructor(type: ActivityType, participants: number) {
        this.type = type;
        this.participants = participants;
    }

    static create(dto: RequestActivityDto) {
        return new RequestActivityDto(dto.type, dto.participants);
    }
}