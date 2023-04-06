import { Module } from '@nestjs/common';
import { MemberService } from './service/member.service';
import { MemberController } from './controller/member.controller';

@Module({
  controllers: [MemberController],
  providers: [MemberService]
})
export class MemberModule {}
