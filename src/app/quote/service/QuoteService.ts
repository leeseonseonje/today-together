import {Inject, Injectable} from '@nestjs/common';
import {translatorApi, TranslatorApi} from '../../translator/TranslatorApi';
import {quoteApi, QuoteApi} from '../api/QuoteApi';
import {InjectRepository} from '@nestjs/typeorm';
import {Quote} from '../Quote.entity';
import {Repository} from 'typeorm';

@Injectable()
export class QuoteService {

  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
    @Inject(quoteApi)
    private readonly quoteApi: QuoteApi,
    @Inject(translatorApi)
    private readonly translatorApi: TranslatorApi,
  ) {
  }

  async todayQuote() {
    await this.quoteRepository.save(Quote.of("김혁규", "중꺾마"));
    return this.quoteRepository;

    // let quote = await this.quoteApi.getQuote();
    //
    // return await this.translatorApi.translation(`${quote.quote} - ${quote.author}`);
  }
}
