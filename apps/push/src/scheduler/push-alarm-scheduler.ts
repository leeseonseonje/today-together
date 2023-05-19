import { Injectable } from "@nestjs/common";
import {Cron, CronExpression} from '@nestjs/schedule';
import {PushService} from '../service/push.service';
import {createNotificationMessage} from '../type/notification-message';

@Injectable()
export class PushAlarmScheduler {

  private readonly messageTitle: string = '미완료 할 일';
  private readonly messageBody: string = '하지 못한 일이 있어요';

  constructor(
    private readonly pushService: PushService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_5PM, {
    timeZone: 'Asia/Seoul',
  })
  async todayTodoNotificationAt5pm() {
    await this.todayTodoNotificationSend();
  }

  @Cron(CronExpression.EVERY_DAY_AT_10PM, {
    timeZone: 'Asia/Seoul',
  })
  async todayTodoNotificationAt10pm() {
    await this.todayTodoNotificationSend();
  }

  private async todayTodoNotificationSend() {
    const message = createNotificationMessage(this.messageTitle, this.messageBody);
    const response = await this.pushService.send(message);
    console.log(`success count: ${response.successCount}`);
  }
}
