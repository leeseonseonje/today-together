import {Module} from '@nestjs/common';
import {ActivityModule} from "./app/activity/activity.module";
import {dbConfig} from "./db/config";
import {QuoteModule} from './app/quote/quote.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TodoModule} from './app/todo/todo.module';

@Module({
  imports: [ActivityModule, QuoteModule, TodoModule, TypeOrmModule.forRoot(dbConfig)],
})
export class AppModule {
}
