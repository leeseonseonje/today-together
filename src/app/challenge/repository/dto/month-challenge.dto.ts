import {LocalDate} from 'js-joda';
import {ApiProperty} from '@nestjs/swagger';

export class MonthChallengeDto {

  @ApiProperty({
    example: '5',
    description: '각 날짜에 커밋한 커밋 횟수',
  })
  commits: number;

  @ApiProperty({
    example: '2022-12-25',
    description: '커밋 날짜',
  })
  commitDay: LocalDate;

  constructor(commits: number, commitDay: LocalDate) {
    this.commits = commits;
    this.commitDay = commitDay;
  }
}
