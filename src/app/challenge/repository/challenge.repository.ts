import {EntityRepository, Repository} from 'typeorm';
import {Challenge} from '../challenge.entity';
import {LocalDate, LocalDateTime} from 'js-joda';
import {plainToInstance} from 'class-transformer';
import {MonthChallengeDto} from './dto/month-challenge.dto';
import {DateTimeUtil} from '../../../util/date-time.util';
import {Todo} from '../../todo/domain/todo.entity';
import {DayCommitHistoryDto} from './dto/day-commit-history.dto';

@EntityRepository(Challenge)
export class ChallengeRepository extends Repository<Challenge> {

  async commit(memberId: number, todoId: number) {
    return await this.save(new Challenge(todoId, memberId, LocalDateTime.now()));
  }

  async dayChallengeCommits(memberId: number, day: LocalDate) {
    return await this
      .createQueryBuilder('c')
      .where('c.memberId = :memberId', {memberId: memberId})
      .andWhere('c.commitTime >= :day', {day: day.toString()})
      .andWhere('c.commitTime < :end', {end: day.plusDays(1).toString()})
      .getCount();
  }

  async monthChallengeCommits(memberId: number, day: LocalDate) {
    const result = await this
      .createQueryBuilder('c')
      .select('count(*)', 'commits')
      .addSelect('date(c.commitTime)', 'commitDay')
      .where('c.memberId = :memberId', {memberId: memberId})
      .andWhere('c.commitTime >= :day', {day: day.toString()})
      .andWhere('c.commitTime < :end', {end: day.plusMonths(1).toString()})
      .groupBy('date(c.commitTime)')
      .getRawMany<{ commits: number, commitDay: Date }>();

    return result.map(r => {
      return new MonthChallengeDto(Number(r.commits), DateTimeUtil.toLocalDate(r.commitDay));
    });
  }

  async dayCommitHistory(memberId: number, day: LocalDate) {
    const result = await this
      .createQueryBuilder('c')
      .addSelect('t.id', 'todoId')
      .addSelect('c.commitTime', 'commitTime')
      .addSelect('t.text', 'description')
      .innerJoin(Todo, 't', 'c.todoId = t.id')
      .where('c.memberId = :memberId', {memberId: memberId})
      .andWhere('c.commitTime >= :day', {day: day.toString()})
      .andWhere('c.commitTime < :end', {end: day.plusDays(1).toString()})
      .getRawMany<{ todoId: number, commitTime: Date, description: string}>();

    return result.map(r => {
      return new DayCommitHistoryDto(r.todoId, DateTimeUtil.toLocalDateTime(r.commitTime), r.description);
    })
  }
}
