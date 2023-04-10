import {TodoRepository} from '../repository/todo.repository';
import {Todo} from '../domain/todo.entity';
import {TodoStatus} from '../domain/todo-status.enum';
import {LocalDate} from 'js-joda';
import {Injectable} from '@nestjs/common';
import {getConnection, getManager} from 'typeorm';
import {Challenge} from '../../challenge/challenge.entity';

@Injectable()
export class TodoService {

  async save(memberId: number, text: string) {
    const todoRepository = this.getTodoRepository();
    const todo = new Todo(memberId, text, LocalDate.now(), TodoStatus.INCOMPLETE);
    return await todoRepository.save(todo);
  }

  async updateText(id: number, text: string) {
    const todoRepository = this.getTodoRepository();
    await todoRepository.updateText(id, text);
  }

  async removeTodo(id: number) {
    const todoRepository = this.getTodoRepository();
    await todoRepository.delete(id);
  }
  async complete(id: number) {
    await getManager().transaction(async manager => {
      const todoRepository = manager.getCustomRepository(TodoRepository);
      await todoRepository.complete(id);
      await manager.getRepository(Challenge).save(new Challenge(LocalDate.now()));
    });
  }

  async getTodayTodo(memberId: number) {
    return await getManager().transaction(async manager => {
      const todoRepository = manager.getCustomRepository(TodoRepository);

      const incompleteTodos = await todoRepository.findIncompleteTodos(memberId);

      for (const todo of incompleteTodos) {
        const newTodayTodo = new Todo(memberId, todo.text, LocalDate.now(), TodoStatus.INCOMPLETE);
        await todoRepository.save(newTodayTodo);
      }

      return await todoRepository.findDayTodos(memberId, LocalDate.now());
    });
  }

  async getDayTodos(memberId: number, day: LocalDate) {
    const todoRepository = this.getTodoRepository();
    return await todoRepository.findDayTodos(memberId, day);
  }

  private getTodoRepository() {
    return getConnection().getCustomRepository(TodoRepository);
  }
}
