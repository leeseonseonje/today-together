import {Body, Controller, Get, Post, Query, UseFilters, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthorizationServer} from './authorization-server.enum';
import {RequestOauthLoginDto} from './dto/request-oauth-login.dto';
import {OauthService} from '../service/oauth.service';
import {LoginExpiredExceptionFilter} from '../exception/filter/login-expired-exception.filter';

@Controller('/oauth2')
@UsePipes(new ValidationPipe())
@UseFilters(LoginExpiredExceptionFilter)
export class OauthController {

  constructor(private readonly oauthService: OauthService) {
  }
  @Get('/google/callback')
  async googleCallback(@Query('code') code: string) {
    console.log(`code = ${code.toString()}`);
  }

  @Post('/login')
  async login(@Body() request: RequestOauthLoginDto) {
    await this.oauthService.login(request.accessToken, AuthorizationServer[request.server.toLocaleUpperCase()]);
  }
}
