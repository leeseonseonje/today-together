export class OauthGetMemberDto {
  readonly id: string;
  readonly email: string;
  readonly name: string;


  constructor(id: string, email: string, name: string) {
    this.id = id;
    this.email = email;
    this.name = name;
  }
}
