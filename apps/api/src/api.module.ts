import {Module} from '@nestjs/common';
import {ActivityApiModule} from './activity/activity-api.module';
import {QuoteApiModule} from './quote/quote-api.module';
import {TodoApiModule} from './todo/todo-api.module';
import {ChallengeApiModule} from './challenge/challenge-api.module';
import {OauthApiModule} from './oauth2/oauth-api.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {APP_FILTER} from '@nestjs/core';
import {ErrorFilter} from 'lib/common/filter/error.filter';
import {MemberModule} from 'lib/entity/domains/member/member.module';
import {BadRequestExceptionFilter} from 'lib/common/filter/bad-request-exception.filter';
import {NotFoundExceptionFilter} from 'lib/common/filter/not-found-exception.filter';
import * as process from 'process';

@Module({
  imports: [ActivityApiModule,
    QuoteApiModule,
    TodoApiModule,
    ChallengeApiModule,
    OauthApiModule,
    MemberModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${!process.env.NODE_ENV ? 'development' : process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        synchronize: configService.get<string>('DB_SYNCHRONIZE'),
        entities: configService.get<string>('DB_ENTITIES'),
        autoLoadEntities: configService.get<string>('DB_AUTO_LOAD_ENTITIES'),
        logging: configService.get<string>('DB_LOGGING'),
      }),
    }),
  ],
  providers: [
    {provide: APP_FILTER, useClass: ErrorFilter},
    {provide: APP_FILTER, useClass: BadRequestExceptionFilter},
    {provide: APP_FILTER, useClass: NotFoundExceptionFilter},
  ],
})
export class ApiModule {
}
