import {EntityRepository, Repository} from 'typeorm';
import {Quote} from '../quote.entity';
import {LocalDate} from 'js-joda';

@EntityRepository(Quote)
export class QuoteRepository extends Repository<Quote> {

  async findByDay(day: LocalDate) {
    return await this.findOne({
      where: {
        day: day,
      }
    });
  }
}
