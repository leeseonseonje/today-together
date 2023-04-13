import {DateTimeUtil} from '../../src/util/date-time.util';
import {LocalDate, LocalDateTime} from 'js-joda';

describe('DateTimeUtil Unit Test', () => {

  it('toDate(): LocalDate, LocalDateTime 객체가 Date 객체로 변환된다.', async () => {
    const now = LocalDate.now();

    const result = DateTimeUtil.toDate(now);

    expect(result).toBeInstanceOf(Date);
  });

  it('toLocalDate: Date 객체를 LocalDate 객체로 변환한다.', async () => {
    const date = new Date();

    const result = DateTimeUtil.toLocalDate(date);

    expect(result).toBeInstanceOf(LocalDate);
  });

  it('toLocalDateTime: Date 객체를 LocalDateTime 객체로 변환한다.', async () => {
    const date = new Date();

    const result = DateTimeUtil.toLocalDateTime(date);

    expect(result).toBeInstanceOf(LocalDateTime);
  });
});
