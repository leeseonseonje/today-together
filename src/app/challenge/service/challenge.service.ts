import { Injectable } from '@nestjs/common';
import {getConnection} from 'typeorm';
import {Challenge} from '../challenge.entity';
import {ChallengeRepository} from '../repository/challenge.repository';
import {LocalDate} from 'js-joda';

@Injectable()
export class ChallengeService {

  //하루 치 - 몇번 한지? VV
  //전체 치 - 각 날 마다 몇번 했는지 (한달 단위)
  //히스토리 - 시간, 뭐로 올린지 등등 그런 것들?

  async getDayCommit(memberId: number, day: LocalDate) {
    const challengeRepository = await this.getChallengeRepository();
    return await challengeRepository.countDayChallenge(memberId, day);
  }

  private getChallengeRepository() {
    return getConnection().getCustomRepository(ChallengeRepository);
  }
}
