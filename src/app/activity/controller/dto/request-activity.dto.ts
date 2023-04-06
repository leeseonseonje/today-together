import {ActivityType} from "../../domain/activity.type.enum";
import {IsEnum, IsNumber} from "class-validator";

export class RequestActivityDto {

  @IsEnum(ActivityType)
  readonly type: ActivityType;

  private constructor(type: ActivityType) {
    this.type = type;
  }

  static create(type: ActivityType) {
    return new RequestActivityDto(type);
  }
}
