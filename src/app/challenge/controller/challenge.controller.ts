import {Controller, Get, Param, Query} from '@nestjs/common';
import {ChallengeService} from '../service/challenge.service';
import {DateTimeUtil} from '../../../util/date-time.util';
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {MonthChallengeDto} from '../repository/dto/month-challenge.dto';
import {DayCommitHistoryDto} from '../repository/dto/day-commit-history.dto';

@ApiTags('challenge')
@Controller('challenges')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {
  }

  @ApiOperation({ summary: '요청 받은 날짜의 커밋 횟수'})
  @ApiQuery({name: 'day', type: 'date', example: '2021-11-25', description: '조회하려는 날짜'})
  @ApiResponse({
    status: 200,
    description: '요청 받은 날짜의 커밋 횟수 반환',
    type: Number
  })
  @Get('/day/:memberId')
  async getDayCommitCount(@Param('memberId') memberId: number,
                          @Query('day') day: string) {
    return await this.challengeService.getDayCommitCount(memberId, DateTimeUtil.toLocalDate(day));
  }

  @ApiOperation({ summary: '요청 받은 달의 총 커밋 횟수'})
  @ApiQuery({name: 'day', type: 'date', example: '2021-11-25', description: '조회하려는 날짜'})
  @ApiResponse({
    status: 200,
    type: MonthChallengeDto
  })
  @Get('/month/:memberId')
  async getMonthCommit(@Param('memberId') memberId: number,
                       @Query('day') day: string) {
    return await this.challengeService.getMonthCommit(memberId, DateTimeUtil.toLocalDate(day));
  }

  @ApiOperation({ summary: '요청 받은 날짜의 커밋 상세내역'})
  @ApiQuery({name: 'day', type: 'date', example: '2021-11-25', description: '조회하려는 날짜'})
  @ApiResponse({
    status: 200,
    type: DayCommitHistoryDto
  })
  @Get('/history/:memberId')
  async dayCommitHistory(@Param('memberId') memberId: number,
                         @Query('day') day: string) {
    return await this.challengeService.dayCommitHistory(memberId, DateTimeUtil.toLocalDate(day));
  }
}
