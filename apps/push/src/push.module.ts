import { Module } from '@nestjs/common';
import { PushController } from './push.controller';
import { PushService } from './push.service';
import {FirebaseModule} from 'nestjs-firebase';

@Module({
  imports: [
    FirebaseModule.forRoot({
      googleApplicationCredential: './fcm-config.json',
    }),
  ],
  controllers: [PushController],
  providers: [PushService],
})
export class PushModule {}
