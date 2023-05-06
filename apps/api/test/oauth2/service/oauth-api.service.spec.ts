import {Test, TestingModule} from '@nestjs/testing';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from '../../db-config';
import {instance, mock, when} from 'ts-mockito';
import {getConnection} from 'typeorm';
import {OauthApi} from 'lib/infra/oauth2/oauth.api';
import {OauthApiService} from '../../../src/oauth2/service/oauth-api.service';
import {OauthApiModule} from '../../../src/oauth2/oauth-api.module';
import {OauthServerType} from 'lib/infra/oauth2/enum/oauth-server-type.enum';
import {ResponseOauthMemberDto} from '../../../src/oauth2/service/dto/response-oauth-member.dto';
import {MemberModule} from 'lib/entity/domains/member/member.module';
import {Member} from 'lib/entity/domains/member/member.entity';

describe('Oauth Api Service Integration Test', () => {
  let sut: OauthApiService;
  let oauthApi: OauthApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig), OauthApiModule, MemberModule],
    }).compile();

    oauthApi = mock(OauthApi);
    sut = new OauthApiService(instance(oauthApi));
    await apiStub();
  });

  afterEach(async () => {
    await getConnection().dropDatabase();
    await getConnection().close();
  })

  it('code로 accessToken을 반환 받는다.', async () => {
    const accessToken = await sut.getToken('code', OauthServerType.GOOGLE);

    expect(accessToken).toBe('accessToken');
  });

  it('oauth2 로그인 accessToken으로 로그인, id, email, name반환 후 member테이블에 upsert', async () => {
    const repository = getConnection().getRepository(Member);

    const result = await sut.login('accessToken', OauthServerType.GOOGLE);

    const findMember = await repository.findOne({
      where: {
        id: 'memberId',
      }
    });
    expect(findMember.id).toBe(result.id)
    expect(findMember.email).toBe(result.email)
    expect(findMember.name).toBe(result.name)
  });

  it('이미 member테이블에 존재하는 회원은 update(id로 체크)', async () => {
    const repository = getConnection().getRepository(Member);
    await repository.save(new Member('memberId', 'email', 'name'));

    const result = await sut.login('accessToken', OauthServerType.GOOGLE);

    const findMember = await repository.findOne({
      where: {
        id: 'memberId',
      }
    });
    expect(findMember.id).toBe(result.id)
    expect(findMember.email).toBe(result.email)
    expect(findMember.name).toBe(result.name)
  });
  const apiStub = async () => {
    when(await oauthApi.getToken('code', OauthServerType.GOOGLE)).thenReturn('accessToken');
    when(await oauthApi.getMember('accessToken', OauthServerType.GOOGLE))
      .thenReturn(new ResponseOauthMemberDto('memberId', 'member@gmail.com', 'memberA'));
  }
});
