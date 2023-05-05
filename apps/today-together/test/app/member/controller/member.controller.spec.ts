import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from '../../../../src/app/member/controller/member.controller';
import { MemberService } from '../../../../src/app/member/service/member.service';

describe('MemberController', () => {
  let controller: MemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [MemberService],
    }).compile();

    controller = module.get<MemberController>(MemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
