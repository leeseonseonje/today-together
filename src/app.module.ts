import { Module } from '@nestjs/common';
import {ActivityModule} from "./activity/ActivityModule";
import {dbConfig} from "./db/config";

@Module({
  imports: [ActivityModule, dbConfig],
})
export class AppModule {}
