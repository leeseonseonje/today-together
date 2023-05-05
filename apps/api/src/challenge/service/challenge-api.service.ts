import {Injectable} from '@nestjs/common';
import {LocalDate} from 'js-joda';
import {getConnection} from 'typeorm';
import {ChallengeRepository} from 'lib/entity/domains/challenge/repository/challenge.repository';

@Injectable()
export class ChallengeApiService {

  async getDayCommitCount(memberId: string, day: LocalDate) {
    const challengeRepository = await this.getChallengeRepository();
    return await challengeRepository.dayChallengeCommits(memberId, day);
  }

  async getMonthCommit(memberId: string, day: LocalDate) {
    const challengeRepository = await this.getChallengeRepository();
    day = LocalDate.of(day.year(), day.month(), 1);
    return await challengeRepository
      .monthChallengeCommits(memberId, day);
  }

  async dayCommitHistory(memberId: string, day: LocalDate) {
    const challengeRepository = await this.getChallengeRepository();
    return await challengeRepository.dayCommitHistory(memberId, day);
  }

  private getChallengeRepository() {
    return getConnection().getCustomRepository(ChallengeRepository);
  }
}
