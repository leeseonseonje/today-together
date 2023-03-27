import {Module} from '@nestjs/common';
import {PapagoApi} from "../translator/PapagoApi";
import {HttpModule} from "@nestjs/axios";
import {QuoteService} from './service/QuoteService';
import {ZenQuoteApi} from './api/ZenQuoteApi';
import {translatorApi, TranslatorApi} from '../translator/TranslatorApi';
import {quoteApi} from './api/QuoteApi';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [
    QuoteService,
    {provide: quoteApi, useClass: ZenQuoteApi},
    {provide: translatorApi, useClass: PapagoApi},
  ],
})
export class QuoteModule {
}
