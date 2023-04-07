import {Module} from '@nestjs/common';
import {ActivityModule} from "./app/activity/activity.module";
import {dbConfig} from "./db/config";
import {QuoteModule} from './app/quote/quote.module';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [ActivityModule, QuoteModule, TypeOrmModule.forRoot(dbConfig)],
})
export class AppModule {
}
