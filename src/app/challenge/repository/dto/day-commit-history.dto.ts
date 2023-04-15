import {LocalDateTime} from 'js-joda';

export class DayCommitHistoryDto {
  todoId: number;

  commitTime: LocalDateTime;

  description: string;

  constructor(todoId: number, commitTime: LocalDateTime, description: string) {
    this.todoId = todoId;
    this.commitTime = commitTime;
    this.description = description;
  }
}
