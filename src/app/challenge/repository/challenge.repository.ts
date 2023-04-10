import {EntityRepository, Repository} from 'typeorm';
import {Challenge} from '../challenge.entity';
import {LocalDate} from 'js-joda';

@EntityRepository(Challenge)
export class ChallengeRepository extends Repository<Challenge> {

  async countDayChallenge(memberId: number, day: LocalDate) {
    return await this.createQueryBuilder('c')
      .select('count(*)')
      .where('c.memberId = :memberId', {memberId: memberId})
      .andWhere('date(commit_time) = :day', {day: day.toString()})
      .getCount();
  }

}
