import {EntityRepository, Repository} from 'typeorm';
import {Todo} from '../domain/todo.entity';
import {TodoStatus} from '../domain/todo-status.enum';
import {LocalDate} from 'js-joda';
import {FindDayTodosDto} from './dto/find-day-todos.dto';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {

  async updateText(id: number, text: string) {
    await this.update(id, {text: text});
  }

  async complete(id: number) {
    await this.update(id, {status: TodoStatus.COMPLETE})
  }

  async findIncompleteTodos(memberId: number) {
    return await this
      .createQueryBuilder('t')
      .select('t.text')
      .where('t.memberId = :memberId', {memberId})
      .andWhere('t.status = :status', {status: TodoStatus.INCOMPLETE})
      .andWhere('t.day < :today', {today: LocalDate.now().toString()})
      .getMany()
  }

  async findDayTodos(memberId: number, day: LocalDate): Promise<FindDayTodosDto[]> {
    const todos = await this
      .createQueryBuilder('t')
      .select(['t.id', 't.text', 't.status'])
      .where('t.memberId = :memberId', {memberId: memberId})
      .andWhere('t.day = :day', {day: day.toString()})
      .getMany();

    return todos.map(todo => {
      return new FindDayTodosDto(todo.id, todo.text, todo.status);
    });
  }
}
