import {ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Controller, Get, Param, Query} from '@nestjs/common';
import {DateTimeUtil} from 'lib/entity/util/date-time.util';
import {ChallengeApiService} from '../service/challenge-api.service';
import {MonthChallengeDto} from '../service/dto/month-challenge.dto';
import {DayCommitHistoryDto} from '../service/dto/day-commit-history.dto';
import {DateParameter} from 'lib/common/dto/date-parameter';

@ApiTags('challenge')
@Controller('challenges')
export class ChallengeController {
  constructor(private readonly challengeApiService: ChallengeApiService) {
  }

  @ApiOperation({ summary: '요청 받은 날짜의 커밋 횟수'})
  @ApiParam({name: 'memberId', type: 'number', example: '1', description: 'oauth id'})
  @ApiQuery({name: 'day', type: 'date', example: '2021-11-25', description: '조회하려는 날짜'})
  @ApiResponse({
    status: 200,
    description: '요청 받은 날짜의 커밋 횟수 반환',
    type: Number
  })
  @Get('/day/:memberId')
  async getDayCommitCount(@Param('memberId') memberId: string,
                          @Query() query: DateParameter) {
    return await this.challengeApiService.getDayCommitCount(memberId, DateTimeUtil.toLocalDate(query.day));
  }

  @ApiOperation({ summary: '요청 받은 달의 총 커밋 횟수'})
  @ApiParam({name: 'memberId', type: 'number', example: '1', description: 'oauth id'})
  @ApiQuery({name: 'day', type: 'date', example: '2021-11-25', description: '조회하려는 날짜'})
  @ApiResponse({
    status: 200,
    type: MonthChallengeDto
  })
  @Get('/month/:memberId')
  async getMonthCommit(@Param('memberId') memberId: string,
                       @Query() query: DateParameter) {
    return await this.challengeApiService.getMonthCommit(memberId, DateTimeUtil.toLocalDate(query.day));
  }

  @ApiOperation({ summary: '요청 받은 날짜의 커밋 상세내역'})
  @ApiParam({name: 'memberId', type: 'number', example: '1', description: 'oauth id'})
  @ApiQuery({name: 'day', type: 'date', example: '2021-11-25', description: '조회하려는 날짜'})
  @ApiResponse({
    status: 200,
    type: DayCommitHistoryDto
  })
  @Get('/history/:memberId')
  async dayCommitHistory(@Param('memberId') memberId: string,
                         @Query() query: DateParameter) {
    return await this.challengeApiService.dayCommitHistory(memberId, DateTimeUtil.toLocalDate(query.day));
  }
}
