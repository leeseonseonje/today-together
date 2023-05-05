import { Module } from '@nestjs/common';
import {OauthController} from './controller/oauth.controller';
import {OauthService} from './service/oauth.service';
import {HttpModule} from '@nestjs/axios';
import {OauthApi} from './api/oauth.api';

@Module({
  imports: [HttpModule],
  controllers: [OauthController],
  providers: [OauthService, OauthApi],
})
export class OauthModule {}
