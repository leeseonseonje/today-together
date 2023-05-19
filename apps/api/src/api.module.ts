import {Module} from '@nestjs/common';
import {ActivityApiModule} from './activity/activity-api.module';
import {QuoteApiModule} from './quote/quote-api.module';
import {TodoApiModule} from './todo/todo-api.module';
import {ChallengeApiModule} from './challenge/challenge-api.module';
import {OauthApiModule} from './oauth2/oauth-api.module';

import {APP_FILTER} from '@nestjs/core';
import {ErrorFilter} from 'lib/common/filter/error.filter';
import {MemberModule} from 'lib/entity/domains/member/member.module';
import {BadRequestExceptionFilter} from 'lib/common/filter/bad-request-exception.filter';
import {NotFoundExceptionFilter} from 'lib/common/filter/not-found-exception.filter';
import {initConfigModule, initDbModule} from 'lib/common/config/module-config';

@Module({
  imports: [
    initConfigModule,
    initDbModule,
    ActivityApiModule,
    QuoteApiModule,
    TodoApiModule,
    ChallengeApiModule,
    OauthApiModule,
    MemberModule,
  ],
  providers: [
    {provide: APP_FILTER, useClass: ErrorFilter},
    {provide: APP_FILTER, useClass: BadRequestExceptionFilter},
    {provide: APP_FILTER, useClass: NotFoundExceptionFilter},
  ],
})
export class ApiModule {
}
