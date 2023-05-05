import { Module } from '@nestjs/common';
import {OauthController} from './controller/oauth.controller';
import {OauthApiService} from './service/oauth-api.service';
import {OauthInfraModule} from 'lib/infra/oauth2/oauth-infra.module';

@Module({
  imports: [OauthInfraModule],
  controllers: [OauthController],
  providers: [OauthApiService],
})
export class OauthApiModule {}
