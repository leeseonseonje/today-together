import {Body, Controller, Get, HttpCode, Post, Query, UseFilters, UsePipes, ValidationPipe} from '@nestjs/common';
import {RequestOauthLoginDto} from './dto/request-oauth-login.dto';
import {OauthApiService} from '../service/oauth-api.service';
import {LoginExpiredExceptionFilter} from './filter/login-expired-exception.filter';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {RequestOauthTokenDto} from './dto/request-oauth-token.dto';
import {ResponseOauthMemberDto} from '../service/dto/response-oauth-member.dto';


@ApiTags('oauth2')
@Controller('/oauth2')
@UsePipes(new ValidationPipe())
@UseFilters(LoginExpiredExceptionFilter)
export class OauthController {

  constructor(private readonly oauthService: OauthApiService) {
  }

  @ApiOperation({ summary: '리다이렉트 uri'})
  @Get('/callback')
  async callback(@Query('code') code: string) {
    console.log(`code = ${code.toString()}`);
  }

  @ApiOperation({ summary: 'access token 발급 요청'})
  @ApiResponse({
    status: 200,
    description: '발급 받은 access token 반환',
    type: String
  })
  @Post('/token')
  @HttpCode(200)
  async token(@Body() request: RequestOauthTokenDto) {
    return await this.oauthService.getToken(request.code, request.server);
  }

  @ApiOperation({ summary: '발급 받은 access token으로 사용자 조회'})
  @ApiResponse({
    status: 200,
    type: ResponseOauthMemberDto
  })
  @ApiResponse({
    status: 401,
    description: '로그인 만료(access token만료)',
  })
  @Post('/login')
  @HttpCode(200)
  async login(@Body() request: RequestOauthLoginDto) {
    return await this.oauthService
      .login(request.accessToken, request.server);
  }
}
