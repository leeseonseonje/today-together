import {IsEnum, IsNotEmpty, IsString} from 'class-validator';
import {OauthServerType} from '../enum/oauth-server-type.enum';

export class RequestOauthLoginDto {

  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsEnum(OauthServerType)
  server: OauthServerType;
}
