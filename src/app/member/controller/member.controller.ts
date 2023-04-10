import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MemberService } from '../service/member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id);
  }
}
