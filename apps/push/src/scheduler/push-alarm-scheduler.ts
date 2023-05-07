import { Injectable } from "@nestjs/common";
import {Cron, CronExpression} from '@nestjs/schedule';
import {PushService} from '../service/push.service';

@Injectable()
export class PushAlarmScheduler {
  constructor(
    private readonly pushService: PushService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_5PM, {
    timeZone: 'Asia/Seoul',
  })
  async todayTodoNotificationAt5pm() {
    const response = await this.pushService.send();
    console.log(`success count: ${response.successCount}`);
  }

  @Cron(CronExpression.EVERY_DAY_AT_10PM, {
    timeZone: 'Asia/Seoul',
  })
  async todayTodoNotificationAt10pm() {
    const response = await this.pushService.send();
    console.log(`success count: ${response.successCount}`);
  }
}
