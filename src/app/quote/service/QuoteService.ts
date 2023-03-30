import {Inject, Injectable} from '@nestjs/common';
import {translatorApi, TranslatorApi} from '../../translator/TranslatorApi';
import {quoteApi, QuoteApi} from '../api/QuoteApi';
import {getConnection} from 'typeorm';
import {QuoteRepository} from '../repository/QuoteRepository';
import {Quote} from '../Quote.entity';
import {LocalDate} from 'js-joda';

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
    const quote = await getConnection().getCustomRepository(QuoteRepository).findTodayQuote();
    if (quote.day.isEqual(LocalDate.now())) {
      return quote;
    }

    const todayQuote = await this.quoteApi.getQuote();
    const author = await this.translatorApi.translation(todayQuote.author);
    const text = await this.translatorApi.translation(todayQuote.text);
    const createTodayQuote = new Quote(author, text, LocalDate.now());
    return await getConnection().getRepository(Quote).save(createTodayQuote);
  }
}
