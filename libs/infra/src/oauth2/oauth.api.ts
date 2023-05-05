import {HttpService} from '@nestjs/axios';
import {LoginUrl} from './enum/login-url.enum';
import {LoginExpiredException} from 'lib/infra/oauth2/exception/login-expired.exception';
import {HttpException, Injectable} from '@nestjs/common';
import {OauthGetMemberDto} from './dto/oauth-get-member.dto';
import {OauthServerType} from './enum/oauth-server-type.enum';
import * as yaml from 'js-yaml';
import {readFileSync} from 'fs';
import {join} from 'path';
import {TokenUrl} from './enum/token-url.enum';
import {YAML_PATH} from '../../yml/path';

@Injectable()
export class OauthApi {

  constructor(private readonly httpService: HttpService) {
  }

  async getToken(code: string, server: OauthServerType) {
    const tokenUrl = TokenUrl[server.toUpperCase()];
    const formData = this.createFormData(code, server);

    const response = await this.httpService
      .axiosRef.post(tokenUrl, formData.toString())
      .catch(error => {
        throw new HttpException(error.response.data, error.response.status);
      });

    return response.data.access_token as string;
  }

  createFormData(code: string, server: OauthServerType) {
    const oauthConfig = yaml
      .load(readFileSync(join(YAML_PATH, 'oauth2.yml'), 'utf8')) as Record<string, any>;

    const oauth2Server = oauthConfig.oauth2[server.toLowerCase()];
    const formData = new URLSearchParams();
    formData.append('grant_type', oauthConfig.oauth2.grant_type);
    formData.append('redirect_uri', oauthConfig.oauth2.redirect_uri);
    formData.append('client_id', oauth2Server.client_id);
    formData.append('client_secret', oauth2Server.client_secret);
    formData.append('code', code);

    return formData;
  }

  async getMember(accessToken: string, server: OauthServerType) {
    const loginUrl = LoginUrl[server.toLocaleUpperCase()];
    const response = await this.httpService
      .axiosRef.get(loginUrl,
        {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        }
      )
      .catch(error => {
        throw new LoginExpiredException(error.response.data, error.response.status);
      });

    const data = response.data;
    return OauthGetMemberDto.of(data, server);
  }
}
