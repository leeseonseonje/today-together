import {IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class SavePushTokenDto {

  @ApiProperty({
    example: 'token',
    description: 'device token',
    required: true
  })
  @IsNotEmpty()
  readonly token: string;

  @ApiProperty({
    example: '1',
    description: 'oauth id',
    required: true
  })
  @IsNotEmpty({message: '존재하지 않는 회원입니다.'})
  readonly memberId: string;
}
