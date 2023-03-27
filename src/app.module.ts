import {Module} from '@nestjs/common';
import {ActivityModule} from "./app/activity/ActivityModule";
import {dbConfig} from "./db/config";
import {QuoteModule} from './app/quote/QuoteModule';

@Module({
  imports: [ActivityModule, QuoteModule, dbConfig],
})
export class AppModule {
}
