import {TodoRepository} from '../repository/todo.repository';
import {Todo} from '../domain/todo.entity';
import {TodoStatus} from '../domain/todo-status.enum';
import {LocalDate} from 'js-joda';
import {Injectable} from '@nestjs/common';
import {getConnection, getManager} from 'typeorm';

@Injectable()
export class TodoService {

  async save(memberId: number, text: string) {
    const todoRepository = getConnection().getCustomRepository(TodoRepository);
    const todo = new Todo(memberId, text, LocalDate.now(), TodoStatus.INCOMPLETE);
    return await todoRepository.save(todo);
  }

  async updateText(id: number, text: string) {
    const todoRepository = getConnection().getCustomRepository(TodoRepository);
    await todoRepository.updateText(id, text);
  }

  async complete(id: number) {
    const todoRepository = getConnection().getCustomRepository(TodoRepository);
    await todoRepository.complete(id);
  }

  async getTodayTodo(memberId: number) {
    return await getManager().transaction(async manager => {
      const todoRepository = manager.getCustomRepository(TodoRepository);

      const incompleteTodos = await todoRepository.findIncompleteTodos(memberId);

      for (const todo of incompleteTodos) {
        const newTodayTodo = new Todo(memberId, todo.text, LocalDate.now(), TodoStatus.INCOMPLETE);
        await todoRepository.save(newTodayTodo);
      }
      return await todoRepository.findTodayTodos(memberId);
    });
  }
}
