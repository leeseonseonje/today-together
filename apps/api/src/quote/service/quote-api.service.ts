import {Inject, Injectable} from '@nestjs/common';
import {quoteApi, QuoteApi} from 'lib/infra/quote/quote.api';
import {translatorApi, TranslatorApi} from 'lib/infra/translator/translator.api';
import {todayQuoteRepository, TodayQuoteRepository} from 'lib/entity/domains/quote/repository/today-quote.repository';
import {Quote} from 'lib/entity/domains/quote/quote.entity';
import {LocalDate} from 'js-joda';
import {ResponseTodayQuoteDto} from './dto/response-today-quote.dto';
import {ResponseQuoteApiDto} from 'lib/infra/quote/dto/response-quote-api.dto';

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

    const translatedQuote = await this.translatedQuote(todayQuote);
    const createQuote = new Quote(translatedQuote.text, translatedQuote.author, LocalDate.now());

    return await this.todayQuoteRepository.save(createQuote);
  }

  private async translatedQuote(todayQuote: ResponseQuoteApiDto): Promise<ResponseQuoteApiDto> {
    const translatedText = await this.translatorApi.translation(todayQuote.text);
    const translatedAuthor = await this.translatorApi.translation(todayQuote.author);
    return {text: translatedText, author: translatedAuthor}
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
