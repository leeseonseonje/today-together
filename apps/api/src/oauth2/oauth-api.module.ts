import { Module } from '@nestjs/common';
import {OauthController} from './controller/oauth.controller';
import {OauthApiService} from './service/oauth-api.service';
import {OauthInfraModule} from 'lib/infra/oauth2/oauth-infra.module';
import {MemberModule} from 'lib/entity/domains/member/member.module';

@Module({
  imports: [OauthInfraModule, MemberModule],
  controllers: [OauthController],
  providers: [OauthApiService],
})
export class OauthApiModule {}
