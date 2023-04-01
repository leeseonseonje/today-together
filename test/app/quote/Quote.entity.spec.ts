import {Quote} from '../../../src/app/quote/Quote.entity';
import {LocalDate} from 'js-joda';

describe('Quote Unit Test', () => {

  it('is not today 테스트 날짜가 오늘과 다르면 true', async () => {
    const quote = new Quote('isNotToday', 'author', LocalDate.now());

    const result = quote.isNotToday(LocalDate.of(9999, 12, 30));

    expect(result).toBeTruthy();
  });
});