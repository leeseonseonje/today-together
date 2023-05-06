import {Injectable} from '@nestjs/common';
import {Todo} from 'lib/entity/domains/todo/todo.entity';
import {LocalDate} from 'js-joda';
import {TodoStatus} from 'lib/entity/domains/todo/todo-status.enum';
import {getConnection, getManager} from 'typeorm';
import {TodoRepository} from 'lib/entity/domains/todo/repository/todo.repository';
import {ChallengeRepository} from 'lib/entity/domains/challenge/repository/challenge.repository';
import {FindDayTodosDto} from './dto/find-day-todos.dto';

@Injectable()
export class TodoApiService {

  async create(memberId: string, text: string) {
    const todo = new Todo(memberId, text, LocalDate.now(), TodoStatus.INCOMPLETE);
    const savedTodo = await this.getTodoRepository().save(todo);
    return savedTodo.id;
  }

  async updateText(id: number, text: Partial<Todo>) {
    await this.getTodoRepository().update(id, text);
    return id;
  }

  async removeTodo(id: number) {
    await this.getTodoRepository().delete(id);
  }

  async complete(memberId: string, todoId: number) {
    return await getManager().transaction(async manager => {
      const todoRepository = manager.getCustomRepository(TodoRepository);
      await todoRepository.update(todoId, {status: TodoStatus.COMPLETE});

      await manager.getCustomRepository(ChallengeRepository).commit(memberId, todoId);

      return todoId;
    });
  }

  async getTodayTodos(memberId: string) {
    return await getManager().transaction(async manager => {
      const todoRepository = manager.getCustomRepository(TodoRepository);

      const incompleteTodos = await todoRepository.findIncompleteTodos(memberId);
      for (const todo of incompleteTodos) {
        const newTodayTodo = new Todo(memberId, todo.text, LocalDate.now(), TodoStatus.INCOMPLETE);
        await todoRepository.save(newTodayTodo);
      }

      return await this.findTodos(todoRepository, memberId, LocalDate.now());
    });
  }

  async getDayTodos(memberId: string, day: LocalDate) {
    return this.findTodos(this.getTodoRepository(), memberId, day);
  }

  private async findTodos(todoRepository: TodoRepository, memberId: string, day: LocalDate) {
    const findTodos = await todoRepository.findDayTodos(memberId, day);
    return findTodos.map(todo => {
      return new FindDayTodosDto(todo.id, todo.text, todo.status);
    });
  }

  private getTodoRepository() {
    return getConnection().getCustomRepository(TodoRepository);
  }
}
