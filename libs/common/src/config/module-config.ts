import {ConfigModule, ConfigService} from '@nestjs/config';

export const initConfigModule = {
  isGlobal: true,
  envFilePath: `.env.${!process.env.NODE_ENV ? 'development' : process.env.NODE_ENV}`
}

export const initDbModule = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: configService.get<string>('DB_TYPE'),
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    synchronize: configService.get<string>('DB_SYNCHRONIZE'),
    entities: configService.get<string>('DB_ENTITIES'),
    autoLoadEntities: configService.get<string>('DB_AUTO_LOAD_ENTITIES'),
    logging: configService.get<string>('DB_LOGGING'),
  }),
}
