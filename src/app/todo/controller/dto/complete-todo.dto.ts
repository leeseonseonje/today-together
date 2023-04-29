import {IsNotEmpty, IsNumber} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CompleteTodoDto {

  @ApiProperty({
    example: '1',
    required: true
  })
  @IsNumber()
  @IsNotEmpty({message: '존재하지 않는 회원입니다.'})
  readonly memberId: number;

  @ApiProperty({
    example: '1',
    required: true
  })
  @IsNumber()
  @IsNotEmpty({message: '존재하지 않는 할 일입니다.'})
  readonly todoId: number;
}
