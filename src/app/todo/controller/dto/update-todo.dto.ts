import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class UpdateTodoDto {

  @ApiProperty({
    example: '1',
    required: true
  })
  @IsNumber()
  @IsNotEmpty({ message: '존재하지 않는 할 일 입니다.'})
  readonly todoId: number;

  @ApiProperty({
    example: '미용실 다녀오기',
    description: '오늘 할 일',
    required: true
  })
  @IsNotEmpty({message: '변경할 할 일을 입력해 주세요.'})
  readonly text: string;
}
