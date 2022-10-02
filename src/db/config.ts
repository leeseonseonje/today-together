import {TypeOrmModule} from "@nestjs/typeorm";

export const dbConfig = TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'will_bored',
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
});