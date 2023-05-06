import {Inject, Injectable} from '@nestjs/common';
import {quoteApi, QuoteApi} from 'lib/infra/quote/quote.api';
import {translatorApi, TranslatorApi} from 'lib/infra/translator/translator.api';
import {todayQuoteRepository, TodayQuoteRepository} from 'lib/entity/domains/quote/repository/today-quote.repository';
import {Quote} from 'lib/entity/domains/quote/quote.entity';
import {LocalDate} from 'js-joda';
import {ResponseTodayQuoteDto} from './dto/response-today-quote.dto';

@Injectable()
export class QuoteApiService {

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

  async cacheTodayQuote() {
    let todayQuote = await this.todayQuoteRepository.findTodayQuote();
    if (todayQuote) {
      return todayQuote;
    }
    return await this.refreshTodayQuote();
  }

  async getTodayQuote() {
    const todayQuote = await this.todayQuoteRepository.findTodayQuote();
    return ResponseTodayQuoteDto.toDto(todayQuote);
  }
}
