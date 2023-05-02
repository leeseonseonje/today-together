import {Module} from '@nestjs/common';
import {ActivityModule} from "./app/activity/activity.module";
import {QuoteModule} from './app/quote/quote.module';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {TodoModule} from './app/todo/todo.module';
import {OauthModule} from './app/oauth2/oauth.module';
import {ChallengeModule} from './app/challenge/challenge.module';
import {APP_FILTER} from '@nestjs/core';
import {ErrorFilter} from './common/error.filter';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {dbConfig, DbConfig} from './db/config';

@Module({
  imports: [ActivityModule,
    QuoteModule,
    TodoModule,
    ChallengeModule,
    OauthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
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
      {
        provide: APP_FILTER,
        useClass: ErrorFilter,
      },
    ],
})
export class AppModule {
}
