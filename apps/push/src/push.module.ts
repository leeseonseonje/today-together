import { Module } from '@nestjs/common';
import { PushService } from './service/push.service';
import {FirebaseModule} from 'nestjs-firebase';
import {PushRepository} from './repository/push.repository';
import {PushTokenModule} from 'lib/entity/domains/member/push/push-token.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PushController} from './controller/push.controller';
import {ScheduleModule} from '@nestjs/schedule';
import {PushAlarmScheduler} from './scheduler/push-alarm-scheduler';
import {TodoModule} from 'lib/entity/domains/todo/todo.module';

@Module({
  imports: [
    FirebaseModule.forRoot({
      googleApplicationCredential: './fcm-config.json',
    }),
    ScheduleModule.forRoot(),
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
    PushTokenModule,
    TodoModule,
  ],
  controllers: [PushController],
  providers: [PushService, PushRepository, PushAlarmScheduler],
})
export class PushModule {}
