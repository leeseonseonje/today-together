import {Injectable} from '@nestjs/common';
import {LocalDate} from 'js-joda';
import {TodoStatus} from 'lib/entity/domains/todo/todo-status.enum';
import {getConnection, getManager} from 'typeorm';
import {Todo} from 'lib/entity/domains/todo/todo.entity';
import {TodoRepository} from 'lib/entity/domains/todo/repository/todo.repository';
import {ChallengeRepository} from 'lib/entity/domains/challenge/repository/challenge.repository';

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

      return await todoRepository.findDayTodos(memberId, LocalDate.now());
    });
  }

  async getDayTodos(memberId: string, day: LocalDate) {
    return await this.getTodoRepository().findDayTodos(memberId, day);
  }

  private getTodoRepository() {
    return getConnection().getCustomRepository(TodoRepository);
  }
}
