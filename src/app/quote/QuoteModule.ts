import {Module} from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {QuoteService} from './service/QuoteService';
import {ZenQuoteApi} from './api/ZenQuoteApi';
import {quoteApi} from './api/QuoteApi';
import {TranslatorModule} from '../translator/TranslatorModule';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Quote} from './Quote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quote]), HttpModule, TranslatorModule],
  providers: [
    QuoteService,
    {provide: quoteApi, useClass: ZenQuoteApi},
  ],
})
export class QuoteModule {
}
