import {EntityRepository, Repository} from 'typeorm';
import {Challenge} from '../challenge.entity';
import {LocalDate, LocalDateTime} from 'js-joda';
import {plainToInstance} from 'class-transformer';
import {MonthChallengeDto} from './dto/month-challenge.dto';
import {DateTimeUtil} from '../../../util/date-time.util';

@EntityRepository(Challenge)
export class ChallengeRepository extends Repository<Challenge> {

  async commit(memberId: number, todoId: number) {
    return await this.save(new Challenge(todoId, memberId, LocalDateTime.now()));
  }

  async dayChallengeCommits(memberId: number, day: LocalDate, end: LocalDate): Promise<number> {
    return await this
      .createQueryBuilder('c')
      .where('c.memberId = :memberId', {memberId: memberId})
      .andWhere('c.commitTime >= :day', {day: day.toString()})
      .andWhere('c.commitTime < :end', {end: end.toString()})
      .getCount();
  }

  async monthChallengeCommits(memberId: number, day: LocalDate, end: LocalDate) {
    const result = await this
      .createQueryBuilder('c')
      .select('count(*)', 'commits')
      .addSelect('date(c.commitTime)', 'commitDay')
      .where('c.memberId = :memberId', {memberId: memberId})
      .andWhere('c.commitTime >= :day', {day: day.toString()})
      .andWhere('c.commitTime < :end', {end: end.toString()})
      .groupBy('date(c.commitTime)')
      .getRawMany<{ commits: number, commitDay: Date }>();

    return result.map(r => {
      return new MonthChallengeDto(Number(r.commits), DateTimeUtil.toLocalDate(r.commitDay));
    });
  }
}
