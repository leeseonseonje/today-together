import {Injectable} from '@nestjs/common';
import {AuthorizationServer} from '../controller/authorization-server.enum';
import {OauthApi} from '../api/oauth.api';

@Injectable()
export class OauthService {

  constructor(private readonly oauthApi: OauthApi) {
  }

  async login(accessToken: string, authorizationServerUrl: AuthorizationServer) {
    await this.oauthApi.getMember(accessToken, authorizationServerUrl);
  }
}
