import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Member} from 'lib/entity/domains/member/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member])]
})
export class MemberModule {}
