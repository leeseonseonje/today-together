import { Module } from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import {OauthApi} from 'lib/infra/oauth2/oauth.api';

@Module({
  imports: [HttpModule],
  providers: [OauthApi],
  exports: [OauthApi]
})
export class OauthInfraModule {}
