import {Test, TestingModule} from '@nestjs/testing';
import {getModule} from '../../../api/test/test-config';
import {PushModule} from '../../src/push.module';
import {PushService} from '../../src/push.service';

describe('PushController', () => {

  let sut: PushService;

  beforeEach(async () => {
    const module = await getModule(PushModule);
    sut = module.get<PushService>(PushService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      sut.fcmTest();
    });
  });
});
