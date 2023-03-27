import {Inject, Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {translatorApi, TranslatorApi} from '../../translator/TranslatorApi';
import {quoteApi, QuoteApi} from '../api/QuoteApi';

@Injectable()
export class QuoteService implements OnApplicationBootstrap {

  constructor(
    @Inject(quoteApi)
    private readonly quoteApi: QuoteApi,
    @Inject(translatorApi)
    private readonly translatorApi: TranslatorApi,
  ) {
  }

  async onApplicationBootstrap() {

  }

  private async todayQuote() {
    let quote = await this.quoteApi.getQuote();

    return await this.translatorApi.translation(`${quote.quote} - ${quote.author}`);
  }
}
