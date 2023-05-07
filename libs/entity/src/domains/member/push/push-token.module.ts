import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PushToken} from 'lib/entity/domains/member/push/push-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PushToken])]
})
export class PushTokenModule {}
