import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MemberService } from '../service/member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  findAll() {
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
  }
}
