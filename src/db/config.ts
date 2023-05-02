import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {ConfigService} from '@nestjs/config';

export class DbConfig {

  constructor(
    private readonly configService: ConfigService
  ) {
  }

  getDbConfig() {
    return {
      type: this.configService.get<string>('DB_TYPE'),
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      synchronize: this.configService.get<string>('DB_SYNCHRONIZE'),
      entities: this.configService.get<string>('DB_ENTITIES'),
      autoLoadEntities: this.configService.get<string>('DB_AUTO_LOAD_ENTITIES'),
      logging: this.configService.get<string>('DB_LOGGING'),
    } as TypeOrmModuleOptions
  }
}
export const dbConfig: TypeOrmModuleOptions = {
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_DATABASE,
  // entities: process.env.DB_ENTITIES,
  // autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES,
  // synchronize: process.env.DB_SYNCRONIZE,
  // logging: process.env.DB_LOGGING,
  type: 'mysql',
  // host: 'today-together-db',
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
