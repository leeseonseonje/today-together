import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { ChallengeService } from '../service/challenge.service';
import {DateTimeUtil} from '../../../util/date-time.util';
import {ApiTags} from '@nestjs/swagger';
@ApiTags('challenge')
@Controller('challenges')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {
  }

  @Get('/day/:memberId')
  async getDayCommit(@Param() memberId: number,
                     @Query() day: string) {
    return await this.challengeService.getDayCommit(memberId, DateTimeUtil.toLocalDate(day));
  }

  @Get('/month/:memberId')
  async getMonthCommit(@Param() memberId: number,
                     @Query() day: string) {
    return await this.challengeService.getMonthCommit(memberId, DateTimeUtil.toLocalDate(day));
  }

  @Get('/history/:memberId')
  async dayCommitHistory(@Param() memberId: number,
                       @Query() day: string) {
    return await this.challengeService.dayCommitHistory(memberId, DateTimeUtil.toLocalDate(day));
  }
}
