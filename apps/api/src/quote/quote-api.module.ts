import {Module} from '@nestjs/common';
import {TranslatorInfraModule} from 'lib/infra/translator/translator-infra.module';
import {QuoteController} from './controller/quote.controller';
import {QuoteApiService} from './service/quote-api.service';
import {QuoteModule} from 'lib/entity/domains/quote/quote.module';
import {ScheduleModule} from '@nestjs/schedule';
import {QuoteInfraModule} from 'lib/infra/quote/quote-infra.module';
import {TodayQuoteMemoryRepository} from './repository/today-quote-memory.repository';
import {TodayQuoteInit} from './init/today-quote.init';
import {TodayQuoteScheduler} from './scheduler/today-quote.scheduler';
import {todayQuoteRepository} from 'lib/entity/domains/quote/repository/today-quote.repository';

@Module({
  imports: [QuoteModule, QuoteInfraModule, TranslatorInfraModule, ScheduleModule.forRoot()],
  controllers: [QuoteController],
  providers: [
    QuoteApiService,
    TodayQuoteInit,
    TodayQuoteScheduler,
    {provide: todayQuoteRepository, useClass: TodayQuoteMemoryRepository},
  ],
})
export class QuoteApiModule {
}
