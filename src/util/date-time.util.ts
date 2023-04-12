import {convert, DateTimeFormatter, LocalDate, LocalDateTime} from 'js-joda';

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

  static toLocalDate(date: string) {
    if (!date) {
      return null;
    }
    return LocalDate.parse(date, this.DATE_FORMATTER);
  }

  static toLocalDateTime(date: string) {
    if (!date) {
      return null;
    }
    return LocalDateTime.now();
    // return LocalDateTime.parse(date, this.DATE_TIME_FORMATTER);
  }
}

