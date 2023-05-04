import {Module} from '@nestjs/common';
import {HttpModule} from "@nestjs/axios";
import {ZenQuoteApi} from './api/zen-quote.api';
import {quoteApi} from './api/quote.api';
import {TranslatorModule} from '../translator/translator.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Quote} from './quote.entity';
import {QuoteService} from './service/quote.service';
import {TodayQuoteInit} from './init/today-quote.init';
import {TodayQuoteScheduler} from './scheduler/today-quote.scheduler';
import {ScheduleModule} from '@nestjs/schedule';
import {TodayQuoteMemoryRepository} from './repository/today-quote-memory.repository';
import {QuoteController} from './controller/quote.controller';
import {todayQuoteRepository} from './repository/today-quote.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Quote]),
    ScheduleModule.forRoot(),
    HttpModule,
    TranslatorModule],
  controllers: [QuoteController],
  providers: [
    QuoteService,
    TodayQuoteInit,
    TodayQuoteScheduler,
    {provide: todayQuoteRepository, useClass: TodayQuoteMemoryRepository},
    {provide: quoteApi, useClass: ZenQuoteApi},
  ],
})
export class QuoteModule {
}
