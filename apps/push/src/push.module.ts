import { Module } from '@nestjs/common';
import { PushService } from './service/push.service';
import {FirebaseModule} from 'nestjs-firebase';
import {PushRepository} from './repository/push.repository';
import {PushTokenModule} from 'lib/entity/domains/member/push/push-token.module';
import {PushController} from './controller/push.controller';
import {ScheduleModule} from '@nestjs/schedule';
import {PushAlarmScheduler} from './scheduler/push-alarm-scheduler';
import {TodoModule} from 'lib/entity/domains/todo/todo.module';
import {initConfigModule, initDbModule} from 'lib/common/config/module-config';

@Module({
  imports: [
    FirebaseModule.forRoot({
      googleApplicationCredential: './fcm-config.json',
    }),
    ScheduleModule.forRoot(),
    initConfigModule,
    initDbModule,
    PushTokenModule,
    TodoModule,
  ],
  controllers: [PushController],
  providers: [PushService, PushRepository, PushAlarmScheduler],
})
export class PushModule {}
