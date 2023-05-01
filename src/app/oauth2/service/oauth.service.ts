import {Injectable} from '@nestjs/common';
import {OauthApi} from '../api/oauth.api';
import {Member} from '../../member/member.entity';
import {getConnection} from 'typeorm';
import {ResponseOauthMemberDto} from './dto/response-oauth-member.dto';
import {OauthServerType} from '../controller/enum/oauth-server-type.enum';

@Injectable()
export class OauthService {

  constructor(private readonly oauthApi: OauthApi) {
  }

  async getToken(code: string, server: OauthServerType) {
    return await this.oauthApi.getToken(code, server);
  }

  async login(accessToken: string, server: OauthServerType) {
    const oauthMember = await this.oauthApi
      .getMember(accessToken, server);

    const member = new Member(oauthMember.id, oauthMember.email, oauthMember.name);
    await getConnection().getRepository(Member).upsert(member, []);

    return new ResponseOauthMemberDto(member.id, member.email, member.name);
  }
}
