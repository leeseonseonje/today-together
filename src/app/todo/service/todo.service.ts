import {Inject} from '@nestjs/common';
import {TodoRepository} from '../repository/todo.repository';
import {Todo} from '../domain/todo.entity';
import {TodoStatus} from '../domain/todo-status.enum';
import {LocalDate} from 'js-joda';

export class TodoService {

  constructor(
    @Inject(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {
  }

  async save(memberId: number, text: string) {
    const todo = new Todo(memberId, text, LocalDate.now(), TodoStatus.INCOMPLETE);
    return await this.todoRepository.save(todo);
  }

  async updateText(id: number, text: string) {
    await this.todoRepository.updateText(id, text);
  }

  async complete(id: number) {
    await this.todoRepository.complete(id);
  }

  async getTodayTodo(memberId: number) {
    const incompleteTodos = await this.todoRepository.findIncompleteTodos(memberId);

    for (const todo of incompleteTodos) {
      const newTodayTodo = new Todo(memberId, todo.text, LocalDate.now(), TodoStatus.INCOMPLETE);
      await this.todoRepository.save(newTodayTodo);
    }

    return this.todoRepository.findTodayTodos(memberId);
  }
}
