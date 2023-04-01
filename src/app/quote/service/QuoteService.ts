import {Inject, Injectable} from '@nestjs/common';
import {translatorApi, TranslatorApi} from '../../translator/TranslatorApi';
import {quoteApi, QuoteApi} from '../api/QuoteApi';
import {getConnection} from 'typeorm';
import {QuoteRepository} from '../repository/QuoteRepository';
import {Quote} from '../Quote.entity';
import {LocalDate} from 'js-joda';
import {TodayQuoteDto} from './dto/TodayQuoteDto';

@Injectable()
export class QuoteService {

  constructor(
    @Inject(quoteApi)
    private readonly quoteApi: QuoteApi,
    @Inject(translatorApi)
    private readonly translatorApi: TranslatorApi,
  ) {}

  async refreshTodayQuote() {
    const todayQuote = await this.quoteApi.getQuote();

    const translatedQuotes = await this.translatorApi.translation(todayQuote.toString());

    const [text, author] = translatedQuotes.split('-');
    const createQuote = new Quote(text, author, LocalDate.now());

    return await getConnection().getRepository(Quote).save(createQuote);
  }

  async getTodayQuote() {
    const quoteRepository = getConnection().getCustomRepository(QuoteRepository);

    let todayQuote = await quoteRepository.findTodayQuote();
    if (todayQuote.isNotToday(LocalDate.now())) {
      todayQuote = await this.refreshTodayQuote()
    }

    return TodayQuoteDto.toDto(todayQuote);
  }
}
