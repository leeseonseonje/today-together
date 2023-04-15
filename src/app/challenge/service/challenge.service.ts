import { Injectable } from '@nestjs/common';
import {getConnection} from 'typeorm';
import {ChallengeRepository} from '../repository/challenge.repository';
import {LocalDate} from 'js-joda';

@Injectable()
export class ChallengeService {

  //히스토리 - 시간, 뭐로 올린지 등등 그런 것들?
  // 시간 - TODO: 하수구 뚫기
  // parameter: memberId, 날 ex)2023-04-21 (LocalDate)
  // select t.todo_id, c.commit_time, t.text from challenge as c inner join todo as t on c.todo_id = t.id where c.member_id = 1 and c.commit_time >= '2023-04-15' and c.commit_time < '2023-04-16';

  async getDayCommit(memberId: number, day: LocalDate) {
    const challengeRepository = await this.getChallengeRepository();
    return await challengeRepository.dayChallengeCommits(memberId, day);
  }

  async getMonthCommit(memberId: number, day: LocalDate) {
    const challengeRepository = await this.getChallengeRepository();
    day = LocalDate.of(day.year(), day.month(), 1);
    return await challengeRepository.monthChallengeCommits(memberId, day);
  }

  async dayCommitHistory(memberId: number, day: LocalDate) {
    const challengeRepository = await this.getChallengeRepository();
    return await challengeRepository.dayCommitHistory(memberId, day);
  }

  private getChallengeRepository() {
    return getConnection().getCustomRepository(ChallengeRepository);
  }
}
