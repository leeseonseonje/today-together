import {Module} from '@nestjs/common';
import {ActivityService} from "./service/ActivityService";
import {RecommendTodoApi} from "./api/recommend-todo.api";
import {Activity} from "./domain/activity.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {HttpModule} from "@nestjs/axios";
import {ActivityController} from "./controller/activity.controller";
import {TranslatorModule} from '../translator/TranslatorModule';

@Module({
  imports: [TypeOrmModule.forFeature([Activity]), HttpModule, TranslatorModule],
  controllers: [ActivityController],
  providers: [
    ActivityService, RecommendTodoApi,
  ],
})
export class ActivityModule {
}
