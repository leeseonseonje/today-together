import { Controller, Get } from '@nestjs/common';
import { PushService } from './push.service';

@Controller('/fcm')
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @Get('/init')
  async init() {
    // await this.pushService.fcmTest();
  }
  @Get('/send')
  async getHello() {
    await this.pushService.sendTest();
  }
}
