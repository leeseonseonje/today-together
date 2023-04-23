import {Injectable} from '@nestjs/common';
import {AuthorizationServer} from '../controller/authorization-server.enum';
import {OauthApi} from '../api/oauth.api';
import {Member} from '../../member/member.entity';
import {getConnection} from 'typeorm';
import {ResponseOauthMemberDto} from './dto/response-oauth-member.dto';

@Injectable()
export class OauthService {

  constructor(private readonly oauthApi: OauthApi) {
  }

  async login(accessToken: string, authorizationServerUrl: AuthorizationServer) {
    const oauthMember = await this.oauthApi
      .getMember(accessToken, authorizationServerUrl);

    const member = new Member(oauthMember.id, oauthMember.email, oauthMember.name);
    const savedMember = await getConnection().getRepository(Member).save(member);

    return new ResponseOauthMemberDto(savedMember.oauth_id, savedMember.email, savedMember.name);
  }
}
