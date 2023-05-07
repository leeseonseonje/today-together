import {Body, Controller, Post} from '@nestjs/common';
import {SavePushTokenDto} from './dto/save-push-token.dto';
import {PushService} from '../service/push.service';

@Controller('/push')
export class PushController {

  constructor(
    private readonly pushService: PushService,
  ) {
  }
  @Post('/token')
  async saveToken(@Body() request: SavePushTokenDto) {
    await this.pushService.save(request.token, request.memberId);
  }
}
