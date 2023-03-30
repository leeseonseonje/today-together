import {ValueTransformer} from 'typeorm';
import {LocalDate} from 'js-joda';
import {DateTimeUtil} from '../util/DateTimeUtil';

export class LocalDateTransformer implements ValueTransformer {
  to(localDateTime: LocalDate): Date {
    return DateTimeUtil.toDate(localDateTime);
  }

  from(date: string): LocalDate {
    return DateTimeUtil.toLocalDateTime(date);
  }
}
