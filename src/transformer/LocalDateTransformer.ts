import { ValueTransformer } from 'typeorm';
import {convert, LocalDate, nativeJs} from 'js-joda';

export class LocalDateTransformer implements ValueTransformer {
  to(localDate: LocalDate): Date {
    return convert(localDate).toDate();
  }

  from(date: Date): LocalDate {
    return LocalDate.from(nativeJs(date))
  }
}
