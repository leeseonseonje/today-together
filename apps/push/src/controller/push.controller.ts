import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {SavePushTokenDto} from './dto/save-push-token.dto';
import {PushService} from '../service/push.service';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('push')
@Controller('/push')
@UsePipes(new ValidationPipe())
export class PushController {

  constructor(
    private readonly pushService: PushService,
  ) {
  }

  @ApiOperation({summary: 'fcm 토큰 저장'})
  @Post('/token')
  async saveToken(@Body() request: SavePushTokenDto) {
    await this.pushService.save(request.token, request.memberId);
  }
}
