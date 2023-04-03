import {Inject, Injectable} from '@nestjs/common';
import {translatorApi, TranslatorApi} from '../../translator/TranslatorApi';
import {quoteApi, QuoteApi} from '../api/QuoteApi';
import {getConnection} from 'typeorm';
import {Quote} from '../Quote.entity';
import {LocalDate} from 'js-joda';
import {TodayQuoteDto} from './dto/TodayQuoteDto';
import {todayQuoteRepository, TodayQuoteRepository} from '../repository/TodayQuoteRepository';

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
    return TodayQuoteDto.toDto(todayQuote);
  }
}
