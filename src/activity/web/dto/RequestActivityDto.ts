import {ActivityType} from "../../domain/ActivityType";
import {IsEnum, IsNumber} from "class-validator";

export class RequestActivityDto {

  @IsEnum(ActivityType)
  readonly type: ActivityType;

  @IsNumber()
  readonly participants;

  private constructor(type: ActivityType, participants: number) {
    this.type = type;
    this.participants = participants;
  }

  static create(type: ActivityType, participants: number) {
    return new RequestActivityDto(type, participants);
  }
}
