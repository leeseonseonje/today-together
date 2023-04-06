import {EntityRepository, Repository} from 'typeorm';
import {Quote} from '../quote.entity';
import {LocalDate} from 'js-joda';

@EntityRepository(Quote)
export class QuoteRepository extends Repository<Quote> {

  async findTodayQuote() {
    const quote = await this.findOne({
      order: {
        id: 'DESC',
      }
    });
    if (quote) {
      return quote;
    } else {
      return new Quote('text', 'author', LocalDate.of(1, 1, 1))
    }
  }
}
