import { Controller, Get } from '@nestjs/common';
import { PushService } from './push.service';

@Controller()
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @Get()
  getHello(): string {
    return this.pushService.getHello();
  }
}
