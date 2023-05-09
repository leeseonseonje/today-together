import {PushRepository} from '../../../src/repository/push.repository';
import {getConnection} from 'typeorm';
import {PushToken} from 'lib/entity/domains/member/push/push-token.entity';
import {Test, TestingModule} from '@nestjs/testing';
import {PushModule} from '../../../src/push.module';
import {TodoModule} from 'lib/entity/domains/todo/todo.module';
import {initDbModule} from 'lib/common/config/module-config';

describe('Push Repository Test', () => {

  let sut: PushRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [initDbModule, PushModule, TodoModule],
    }).compile()

    sut = module.get<PushRepository>(PushRepository);
  });

  afterEach(async () => {
    //await getConnection().dropDatabase();
  })

  it('memberId로 pushToken 조회', async () => {
    const repository = await getConnection().getRepository(PushToken);
    const memberIds = [];
    for (let i = 1; i <= 5; i++) {
      await repository.save(new PushToken('token' + i, 'memberId' + i));
      memberIds.push('memberId' + i);
    }
    const result = await sut.findPushToken(memberIds);
    expect(result).toHaveLength(5);
  });
});
