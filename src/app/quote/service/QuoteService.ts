import {Inject, Injectable} from '@nestjs/common';
import {translatorApi, TranslatorApi} from '../../translator/TranslatorApi';
import {quoteApi, QuoteApi} from '../api/QuoteApi';
import {getConnection} from 'typeorm';
import {QuoteRepository} from '../repository/QuoteRepository';
import {Quote} from '../Quote.entity';
import {LocalDate} from 'js-joda';
import {TodayQuoteDto} from './dto/TodayQuoteDto';
import {TodayQuoteMemoryRepository} from '../repository/TodayQuoteMemoryRepository';

@Injectable()
export class QuoteService {

  constructor(
    @Inject(quoteApi)
    private readonly quoteApi: QuoteApi,
    @Inject(translatorApi)
    private readonly translatorApi: TranslatorApi,
    private readonly todayQuoteRepository: TodayQuoteMemoryRepository,
  ) {
  }

  async refreshTodayQuote() {
    const todayQuote = await this.quoteApi.getQuote();

    const translatedQuotes = await this.translatorApi.translation(todayQuote.toString());

    const [text, author] = translatedQuotes.split('-');
    const createQuote = new Quote(text, author, LocalDate.now());

    this.todayQuoteRepository.save(createQuote);
    return await getConnection().getRepository(Quote).save(createQuote);
  }

  async initTodayQuote() {
    const quoteRepository = getConnection().getCustomRepository(QuoteRepository);

    let todayQuote = await quoteRepository.findTodayQuote();

    if (todayQuote.isToday(LocalDate.now())) {
      this.todayQuoteRepository.save(todayQuote);
    } else {
      todayQuote = await this.refreshTodayQuote();
    }

    return TodayQuoteDto.toDto(todayQuote);
  }

  async getTodayQuote() {
    let todayQuote = this.todayQuoteRepository.findTodayQuote();
    return TodayQuoteDto.toDto(todayQuote);
  }
}
