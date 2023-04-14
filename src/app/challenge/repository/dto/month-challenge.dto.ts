import {LocalDate} from 'js-joda';

export class MonthChallengeDto {
  commits: number;

  commitDay: LocalDate;

  constructor(commits: number, commitDay: LocalDate) {
    this.commits = commits;
    this.commitDay = commitDay;
  }
}
