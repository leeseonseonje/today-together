import {HttpService} from '@nestjs/axios';
import {LoginUrl} from './url/login-url.enum';
import {LoginExpiredException} from '../exception/login-expired.exception';
import {Injectable} from '@nestjs/common';
import {OauthGetMemberDto} from './dto/oauth-get-member.dto';

@Injectable()
export class OauthApi {

  constructor(private readonly httpService: HttpService) {
  }

  async getToken(code: string) {

  }

  async getMember(accessToken: string, authorizationServerUrl: LoginUrl) {
    const response = await this.httpService
      .axiosRef.get(authorizationServerUrl,
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
    return new OauthGetMemberDto(data.sub, data.name, data.email);
  }
}
