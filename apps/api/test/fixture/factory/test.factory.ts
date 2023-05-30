import {LocalDate, LocalDateTime} from 'js-joda';
import {Challenge} from 'lib/entity/domains/challenge/challenge.entity';
import {Todo} from 'lib/entity/domains/todo/todo.entity';
import {TodoStatus} from 'lib/entity/domains/todo/todo-status.enum';

export const createChallenge = (todoId: number, memberId: string, date: LocalDateTime) => {
  return new Challenge(todoId, memberId, date);
}

export const createTodo = (memberId: string, text: string, date: LocalDate, status: TodoStatus) => {
  return new Todo(memberId, text, date, status);
}
