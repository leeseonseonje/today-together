import {IsDateString} from 'class-validator';

export class DateParameter {
  @IsDateString()
  day: string;
}
