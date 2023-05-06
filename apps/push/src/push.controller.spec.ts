import { Test, TestingModule } from '@nestjs/testing';
import { PushController } from './push.controller';
import { PushService } from './push.service';

describe('PushController', () => {
  let pushController: PushController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PushController],
      providers: [PushService],
    }).compile();

    pushController = app.get<PushController>(PushController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(pushController.getHello()).toBe('Hello World!');
    });
  });
});
