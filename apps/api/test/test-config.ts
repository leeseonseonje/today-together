import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {ApiModule} from '../src/api.module';

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
export const e2eTestConfig = async (): Promise<TestApplication> =>  {
  const module: TestingModule = await Test.createTestingModule({
    imports: [ApiModule],
  }).compile();

  const app = module.createNestApplication();
  await app.init();

  return {app: app, module: module};
}

export const getModule = async (module) => {
  return await Test.createTestingModule({
    imports: [TypeOrmModule.forRoot(dbConfig), module],
  }).compile()
}
