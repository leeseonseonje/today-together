import { Injectable } from '@nestjs/common';
import {getConnection} from 'typeorm';
import {ChallengeRepository} from '../repository/challenge.repository';
import {LocalDate} from 'js-joda';

@Injectable()
export class ChallengeService {

  //하루 치 - 몇번 한지? VV
  //전체 치 - 각 날 마다 몇번 했는지 (한달 단위)
  //히스토리 - 시간, 뭐로 올린지 등등 그런 것들?

  async getDayCommit(memberId: number, day: LocalDate) {
    const challengeRepository = await this.getChallengeRepository();
    const end = day.plusDays(1);
    return await challengeRepository.dayChallengeCommits(memberId, day, end);
  }

  async getMonthCommit(memberId: number, day: LocalDate) {
    const challengeRepository = await this.getChallengeRepository();
    day = LocalDate.of(day.year(), day.month(), 1);
    const end = day.plusMonths(1);
    return await challengeRepository.monthChallengeCommits(memberId, day, end);
  }

  private getChallengeRepository() {
    return getConnection().getCustomRepository(ChallengeRepository);
  }
}
