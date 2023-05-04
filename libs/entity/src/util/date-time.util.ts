import {convert, DateTimeFormatter, LocalDate, LocalDateTime, nativeJs} from 'js-joda';

export class DateTimeUtil {
  private static DATE_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd');
  private static DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern(
    'yyyy-MM-dd HH:mm:ss',
  );

  static toDate(localDate: LocalDate | LocalDateTime) {
    if (!localDate) {
      return null;
    }
    return convert(localDate).toDate();
  }

  static toLocalDate(date: Date | string) {
    if (typeof date === 'string') {
      return LocalDate.parse(date, this.DATE_FORMATTER);
    } else {
      return LocalDate.from(nativeJs(date));
    }
  }

  static toLocalDateTime(date: Date | string) {
    if (typeof date === 'string') {
      return LocalDateTime.parse(date, this.DATE_TIME_FORMATTER);
    } else {
      return LocalDateTime.from(nativeJs(date));
    }
  }
}

