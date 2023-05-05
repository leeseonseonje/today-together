import {Global, Module} from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import {ZenQuoteApi} from 'lib/infra/quote/zen-quote.api';
import {quoteApi} from 'lib/infra/quote/quote.api';

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    {provide: quoteApi, useClass: ZenQuoteApi},
  ],
  exports: [
    {provide: quoteApi, useClass: ZenQuoteApi}
  ]
})
export class QuoteInfraModule {
}
