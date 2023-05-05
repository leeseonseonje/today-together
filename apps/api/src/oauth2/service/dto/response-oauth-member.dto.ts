import {ApiProperty} from '@nestjs/swagger';

export class ResponseOauthMemberDto {

  @ApiProperty({
    example: '11111',
    description: '사용자의 oauth id',
  })
  readonly id: string;

  @ApiProperty({
    example: 'leeseonje9323@gmail.com',
    description: '사용자의 email',
  })
  readonly email: string;

  @ApiProperty({
    example: '이선제',
    description: '사용자의 이름',
  })
  readonly name: string;

  constructor(id: string, email: string, name: string) {
    this.id = id;
    this.email = email;
    this.name = name;
  }
}
