import {EntityRepository, Repository} from 'typeorm';
import {Challenge} from '../challenge.entity';
import {LocalDate, LocalDateTime} from 'js-joda';

@EntityRepository(Challenge)
export class ChallengeRepository extends Repository<Challenge> {

  async commit(memberId: number, todoId: number) {
    const challenge = await this.findOne({
      where: {
        memberId: memberId
      }
    });
    if (challenge) {
      return await this.update(challenge.id, {commits: challenge.commits + 1});
    } else {
      return await this.save(new Challenge(todoId, memberId, 1, LocalDateTime.now()));
    }
  }

  async dayChallengeCommits(memberId: number, day: LocalDate, end: LocalDate):
    Promise<Pick<Challenge, 'todoId' | 'commitTime' | 'commits'>> {
    console.log(day)
    console.log(end)
    return  await this
      .createQueryBuilder('c')
      .select(['c.todoId', 'c.commitTime', 'c.commits'])
      .where('c.memberId = :memberId', {memberId: memberId})
      .andWhere('c.commitTime >= :day', {day: day.toString()})
      .andWhere('c.commitTime < :end', {end: end.toString()})
      .getOne();
  }

  async monthChallengeCommits(memberId: number, day: LocalDate, end: LocalDate)
    : Promise<Pick<Challenge, 'todoId' | 'commitTime'| 'commits'>[]>{
    return await this
      .createQueryBuilder('c')
      .select(['c.todoId', 'c.commitTime', 'c.commits'])
      .where('c.memberId = :memberId', {memberId: memberId})
      .andWhere('c.commitTime >= :day', {day: day.toString()})
      .andWhere('c.commitTime < :end', {end: end.toString()})
      .getMany();
  }
}
