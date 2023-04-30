import {Body, Controller, Get, Post, Query, UseFilters, UsePipes, ValidationPipe} from '@nestjs/common';
import {LoginUrl} from '../api/url/login-url.enum';
import {RequestOauthLoginDto} from './dto/request-oauth-login.dto';
import {OauthService} from '../service/oauth.service';
import {LoginExpiredExceptionFilter} from '../exception/filter/login-expired-exception.filter';
import {ApiTags} from '@nestjs/swagger';


@ApiTags('oauth2')
@Controller('/oauth2')
@UsePipes(new ValidationPipe())
@UseFilters(LoginExpiredExceptionFilter)
export class OauthController {

  constructor(private readonly oauthService: OauthService) {
  }
  @Get('/callback')
  async callback(@Query('code') code: string) {
    console.log(`code = ${code.toString()}`);
  }

  @Post('/login')
  async login(@Body() request: RequestOauthLoginDto) {
    return await this.oauthService
      .login(request.accessToken, LoginUrl[request.server.toLocaleUpperCase()]);
  }
}
