import {OauthServerType} from '../enum/oauth-server-type.enum';

export class OauthGetMemberDto {

  readonly id: string;
  readonly email: string;
  readonly name: string;


  private constructor(id: string, email: string, name: string) {
    this.id = id;
    this.email = email;
    this.name = name;
  }

  static of(data: any, server: OauthServerType) {
    if (server === 'google') {
      return new OauthGetMemberDto(data.sub, data.name, data.email);
    } else if (server === 'kakao') {
      return new OauthGetMemberDto(data.id, data.kakao_account.email, data.kakao_account.profile.nickname);
    }
  }
}
