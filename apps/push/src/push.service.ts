import { Injectable } from '@nestjs/common';

@Injectable()
export class PushService {
  getHello(): string {
    return 'Hello World!';
  }
}
