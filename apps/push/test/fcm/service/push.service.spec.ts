import {PushModule} from '../../../src/push.module';
import {PushService} from '../../../src/service/push.service';
import {Test, TestingModule} from '@nestjs/testing';
import {initDbModule} from 'lib/common/config/module-config';
import {createNotificationMessage} from '../../../src/type/notification-message.type';

describe('Push Service Test', () => {

  let sut: PushService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [initDbModule, PushModule],
    }).compile()
    sut = module.get<PushService>(PushService);
  });

  it('fcm push send', async () => {
    await sut.send(createNotificationMessage('title', 'body'));
  });
});
