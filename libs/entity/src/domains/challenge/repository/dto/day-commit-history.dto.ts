import {LocalDateTime} from 'js-joda';
import {ApiProperty} from '@nestjs/swagger';

export class DayCommitHistoryDto {

  @ApiProperty({
    example: '1',
    description: 'todo id',
  })
  todoId: number;

  @ApiProperty({
    example: '2022-12-25 01:30:25',
    description: '커밋한 시간',
  })
  commitTime: LocalDateTime;

  @ApiProperty({
    example: '미용실 다녀오기',
    description: '뭐로 커밋한지에 대한 설명',
  })
  description: string;

  constructor(todoId: number, commitTime: LocalDateTime, description: string) {
    this.todoId = todoId;
    this.commitTime = commitTime;
    this.description = description;
  }
}
