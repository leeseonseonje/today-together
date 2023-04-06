import {Inject, Injectable} from '@nestjs/common';
import {translatorApi, TranslatorApi} from '../../translator/translator.api';
import {quoteApi, QuoteApi} from '../api/quote.api';
import {Quote} from '../quote.entity';
import {LocalDate} from 'js-joda';
import {ResponseTodayQuoteDto} from './dto/response-today-quote.dto';
import {todayQuoteRepository, TodayQuoteRepository} from '../repository/today-quote.repository';

@Injectable()
export class QuoteService {

  constructor(
    @Inject(quoteApi)
    private readonly quoteApi: QuoteApi,
    @Inject(translatorApi)
    private readonly translatorApi: TranslatorApi,
    @Inject(todayQuoteRepository)
    private readonly todayQuoteRepository: TodayQuoteRepository,
  ) {
  }

  async refreshTodayQuote() {
    const todayQuote = await this.quoteApi.getQuote();

    const translatedQuotes = await this.translatorApi.translation(todayQuote.toString());

    const [text, author] = translatedQuotes.split('-');
    const createQuote = new Quote(text, author, LocalDate.now());

    return await this.todayQuoteRepository.save(createQuote);
  }

  async initTodayQuote() {
    let todayQuote = await this.todayQuoteRepository.findTodayQuote();
    if (todayQuote.isToday(LocalDate.now())) {
      return todayQuote;
    }
    return await this.refreshTodayQuote();
  }

  async getTodayQuote() {
    const todayQuote = await this.todayQuoteRepository.findTodayQuote();
    return ResponseTodayQuoteDto.toDto(todayQuote);
  }
}
