import {PushModule} from '../../../src/push.module';
import {PushService} from '../../../src/service/push.service';
import {Test, TestingModule} from '@nestjs/testing';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from '../../../../../libs/common/test/test-config';
import {TodoModule} from 'lib/entity/domains/todo/todo.module';

describe('Push Service Test', () => {

  let sut: PushService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig), PushModule],
    }).compile()
    sut = module.get<PushService>(PushService);
  });

  it('fcm push send', async () => {
    await sut.send();
  });
});
