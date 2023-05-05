import {ApiProperty} from '@nestjs/swagger';
import {TodoStatus} from 'lib/entity/domains/todo/todo-status.enum';

export class FindDayTodosDto {

  @ApiProperty({
    example: '1',
    description: 'todo id',
  })
  readonly id: number;

  @ApiProperty({
    example: '미용실 다녀오기',
    description: '할 일',
  })
  readonly text: string;

  @ApiProperty({
    example: 'COMPLETE',
    description: '할 일 상태(COMPLETE, INCOMPLETE',
  })
  readonly status: TodoStatus;

  constructor(id: number, text: string, status: TodoStatus) {
    this.id = id;
    this.text = text;
    this.status = status;
  }
}
