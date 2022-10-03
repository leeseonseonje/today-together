import {ActivityType} from "./ActivityType";
import {IsEnum, IsNumber} from "class-validator";

export class RequestActivityDto {

    @IsEnum(ActivityType)
    readonly type: ActivityType;

    @IsNumber()
    readonly participants;

    constructor(type: ActivityType, participants: number) {
        this.type = type;
        this.participants = participants;
    }

    static create(dto: RequestActivityDto) {
        return new RequestActivityDto(dto.type, dto.participants);
    }
}