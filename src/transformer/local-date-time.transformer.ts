import {ValueTransformer} from 'typeorm';
import {LocalDate, LocalDateTime} from 'js-joda';
import {DateTimeUtil} from '../util/date-time.util';

export class LocalDateTimeTransformer implements ValueTransformer {
  to(localDateTime: LocalDateTime){
    return DateTimeUtil.toDate(localDateTime);
  }

  from(date: string) {
    return DateTimeUtil.toLocalDateTime(date);
  }
}
