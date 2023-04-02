import {Module} from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {ZenQuoteApi} from './api/ZenQuoteApi';
import {quoteApi} from './api/QuoteApi';
import {TranslatorModule} from '../translator/TranslatorModule';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Quote} from './Quote.entity';
import {QuoteService} from './service/QuoteService';
import {InitTodayQuote} from './init/InitTodayQuote';
import {TodayQuoteScheduler} from './scheduler/TodayQuoteScheduler';
import {ScheduleModule} from '@nestjs/schedule';
import {TodayQuoteMemoryRepository} from './repository/TodayQuoteMemoryRepository';
import {QuoteController} from './controller/QuoteController';
import {todayQuoteRepository} from './repository/TodayQuoteRepository';

@Module({
  imports: [TypeOrmModule.forFeature([Quote]),
    ScheduleModule.forRoot(),
    HttpModule,
    TranslatorModule],
  controllers: [QuoteController],
  providers: [
    QuoteService,
    InitTodayQuote,
    TodayQuoteScheduler,
    {provide: todayQuoteRepository, useClass: TodayQuoteMemoryRepository},
    {provide: quoteApi, useClass: ZenQuoteApi},
  ],
})
export class QuoteModule {
}
