import {EntityRepository, Repository} from 'typeorm';
import {LocalDate} from 'js-joda';
import {FindDayTodosDto} from '../dto/find-day-todos.dto';
import {Todo} from 'lib/entity/domains/todo/todo.entity';
import {TodoStatus} from 'lib/entity/domains/todo/todo-status.enum';

@EntityRepository(Todo)
export class TodoApiRepository extends Repository<Todo> {

  async findIncompleteTodos(memberId: string) {
    return await this
      .createQueryBuilder('t')
      .where('t.memberId = :memberId', {memberId})
      .andWhere('t.status = :status', {status: TodoStatus.INCOMPLETE})
      .andWhere('t.day < :today', {today: LocalDate.now().toString()})
      .getMany()
  }

  async findDayTodos(memberId: string, day: LocalDate) {
    const result = await this
      .createQueryBuilder('t')
      .where('t.memberId = :memberId', {memberId: memberId})
      .andWhere('t.day = :day', {day: day.toString()})
      .getMany();

    return result.map(todo => {
      return new FindDayTodosDto(todo.id, todo.text, todo.status);
    });
  }
}
