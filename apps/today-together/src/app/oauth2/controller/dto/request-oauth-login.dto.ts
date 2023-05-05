import {IsEnum, IsNotEmpty, IsString} from 'class-validator';
import {OauthServerType} from '../../api/enum/oauth-server-type.enum';
import {ApiProperty} from '@nestjs/swagger';

export class RequestOauthLoginDto {

  @ApiProperty({
    example: 'access token',
    description: '발급 받은 access token',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  readonly accessToken: string;

  @ApiProperty({
    example: 'google',
    description: '로그인 서버(google, naver, kakao 등)',
    required: true
  })
  @IsEnum(OauthServerType)
  readonly server: OauthServerType;
}
