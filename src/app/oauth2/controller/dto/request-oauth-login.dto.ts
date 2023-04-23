import {IsNotEmpty} from 'class-validator';
import {AuthorizationServer} from '../authorization-server.enum';
import {ApiProperty} from '@nestjs/swagger';

export class RequestOauthLoginDto {

  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  server: AuthorizationServer;
}
