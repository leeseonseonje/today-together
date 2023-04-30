import {OauthServerType} from '../enum/oauth-server-type.enum';
import {IsEnum, IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class RequestOauthTokenDto {

  @ApiProperty({
    example: '4342fd334ffd',
    description: '인증 후 반환 받은 code 값',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  readonly code: string;

  @ApiProperty({
    example: 'google',
    description: '로그인 서버(google, naver, kakao 등)',
    required: true
  })
  @IsEnum(OauthServerType)
  readonly server: OauthServerType;
}
