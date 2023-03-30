import {Module} from '@nestjs/common';
import {ActivityService} from "./service/ActivityService";
import {RecommendTodoApi} from "./api/RecommendTodoApi";
import {Activity} from "./domain/Activity.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {HttpModule} from "@nestjs/axios";
import {ActivityController} from "./controller/ActivityController";
import {TranslatorModule} from '../translator/TranslatorModule';
import {ActivityRepository} from './repository/ActivityRepository';

@Module({
  imports: [TypeOrmModule.forFeature([Activity]), HttpModule, TranslatorModule],
  controllers: [ActivityController],
  providers: [
    ActivityService, RecommendTodoApi,
  ],
})
export class ActivityModule {
}
