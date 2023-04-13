import {LocalDate} from 'js-joda';
import {Expose} from 'class-transformer';

export class MonthChallengeDto {
  @Expose()
  commits: number;

  @Expose()
  commitDay: LocalDate;

  constructor(commits: number, commitDay: LocalDate) {
    this.commits = commits;
    this.commitDay = commitDay;
  }
}
