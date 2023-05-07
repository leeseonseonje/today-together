import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'today_together',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
  // logging: true,
};

export type TestApplication = {app: INestApplication, module: TestingModule}
export const e2eTestConfig = async (module): Promise<TestApplication> =>  {
  const testModule: TestingModule = await Test.createTestingModule({
    imports: [module],
  }).compile();

  const app = testModule.createNestApplication();
  await app.init();

  return {app: app, module: testModule};
}
