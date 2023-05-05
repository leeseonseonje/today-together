import {EntityRepository, Repository} from 'typeorm';
import {Todo} from '../todo.entity';
import {TodoStatus} from '../todo-status.enum';
import {LocalDate} from 'js-joda';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {

  async findIncompleteTodos(memberId: string) {
    return await this
      .createQueryBuilder('t')
      .where('t.memberId = :memberId', {memberId})
      .andWhere('t.status = :status', {status: TodoStatus.INCOMPLETE})
      .andWhere('t.day < :today', {today: LocalDate.now().toString()})
      .getMany()
  }

  async findDayTodos(memberId: string, day: LocalDate) {
    return await this
      .createQueryBuilder('t')
      .where('t.memberId = :memberId', {memberId: memberId})
      .andWhere('t.day = :day', {day: day.toString()})
      .getMany();
  }
}
