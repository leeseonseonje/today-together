import {convert, DateTimeFormatter, LocalDate} from 'js-joda';

export class DateTimeUtil {
  private static DATE_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd');

  static toDate(localDate: LocalDate): Date {
    if (!localDate) {
      return null;
    }
    return convert(localDate).toDate();
  }

  static toLocalDate(date: string): LocalDate {
    if (!date) {
      return null;
    }
    return LocalDate.parse(date, this.DATE_FORMATTER);
  }
}

