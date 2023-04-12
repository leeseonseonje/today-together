import {ValueTransformer} from 'typeorm';
import {LocalDate} from 'js-joda';
import {DateTimeUtil} from '../util/date-time.util';

export class LocalDateTransformer implements ValueTransformer {
  to(localDate: LocalDate) {
    return DateTimeUtil.toDate(localDate);
  }

  from(date: string) {
    return DateTimeUtil.toLocalDate(date);
  }
}
