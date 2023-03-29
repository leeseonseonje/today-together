import {Module} from '@nestjs/common';
import {ActivityModule} from "./app/activity/ActivityModule";
import {dbConfig} from "./db/config";
import {QuoteModule} from './app/quote/QuoteModule';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [ActivityModule, QuoteModule, TypeOrmModule.forRoot(dbConfig)],
})
export class AppModule {
}
