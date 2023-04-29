import {Module} from '@nestjs/common';
import {ActivityModule} from "./app/activity/activity.module";
import {dbConfig} from "./db/config";
import {QuoteModule} from './app/quote/quote.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TodoModule} from './app/todo/todo.module';
import {OauthModule} from './app/oauth2/oauth.module';
import {ChallengeModule} from './app/challenge/challenge.module';

@Module({
  imports: [ActivityModule, QuoteModule, TodoModule, ChallengeModule, OauthModule, TypeOrmModule.forRoot(dbConfig)],
})
export class AppModule {
}
