import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';

export type TestApplication = {app: INestApplication, module: TestingModule}
export const e2eTestConfig = async (module): Promise<TestApplication> =>  {
  const testModule: TestingModule = await Test.createTestingModule({
    imports: [module],
  }).compile();

  const app = testModule.createNestApplication();
  await app.init();

  return {app: app, module: testModule};
}
