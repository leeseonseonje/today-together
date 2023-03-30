import {EntityRepository, Repository} from 'typeorm';
import {Quote} from '../Quote.entity';

@EntityRepository(Quote)
export class QuoteRepository extends Repository<Quote> {



}
