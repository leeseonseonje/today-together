import {IsNotEmpty} from 'class-validator';
import {AuthorizationServer} from '../authorization-server.enum';

export class RequestOauthLoginDto {

  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  server: AuthorizationServer;
}
