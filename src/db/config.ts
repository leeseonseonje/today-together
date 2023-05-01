import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'today-together-db',
  // host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'today_together',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
  // logging: true,
};
