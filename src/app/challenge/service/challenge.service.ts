import {Injectable} from '@nestjs/common';
import {getConnection} from 'typeorm';
import {ChallengeRepository} from '../repository/challenge.repository';
import {LocalDate} from 'js-joda';

@Injectable()
export class ChallengeService {

  async getDayCommitCount(memberId: number, day: LocalDate) {
    const challengeRepository = await this.getChallengeRepository();
    return await challengeRepository.dayChallengeCommits(memberId, day);
  }

  async getMonthCommit(memberId: number, day: LocalDate) {
    const challengeRepository = await this.getChallengeRepository();
    day = LocalDate.of(day.year(), day.month(), 1);
    return await challengeRepository
      .monthChallengeCommits(memberId, day);
  }

  async dayCommitHistory(memberId: number, day: LocalDate) {
    const challengeRepository = await this.getChallengeRepository();
    return await challengeRepository.dayCommitHistory(memberId, day);
  }

  private getChallengeRepository() {
    return getConnection().getCustomRepository(ChallengeRepository);
  }
}
