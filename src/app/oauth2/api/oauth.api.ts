import {HttpService} from '@nestjs/axios';
import {AuthorizationServer} from '../controller/authorization-server.enum';
import {LoginExpiredException} from '../exception/login-expired.exception';
import {Injectable} from '@nestjs/common';
import {OauthGetMemberDto} from './dto/oauth-get-member.dto';

@Injectable()
export class OauthApi {

  constructor(private readonly httpService: HttpService) {
  }

  async getMember(accessToken: string, authorizationServerUrl: AuthorizationServer) {
    const response = await this.httpService
      .axiosRef.get(authorizationServerUrl,
        {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        }
      )
      .catch(error => {
        throw new LoginExpiredException(error, error.response.status);
      });

    const data = response.data;
    return new OauthGetMemberDto(data.sub, data.name, data.email);
  }
}
