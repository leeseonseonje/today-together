import {Inject, Injectable} from '@nestjs/common';
import {translatorApi, TranslatorApi} from '../../translator/TranslatorApi';
import {quoteApi, QuoteApi} from '../api/QuoteApi';
import {getConnection} from 'typeorm';
import {QuoteRepository} from '../repository/QuoteRepository';
import {Quote} from '../Quote.entity';

@Injectable()
export class QuoteService {

  constructor(
    @Inject(quoteApi)
    private readonly quoteApi: QuoteApi,
    @Inject(translatorApi)
    private readonly translatorApi: TranslatorApi,
  ) {
  }

  async todayQuote() {
    return await getConnection().getCustomRepository(QuoteRepository).save(Quote.of("dasda", "dsada"));
  }
}
