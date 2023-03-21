import {Module} from '@nestjs/common';
import {ActivityService} from "./service/ActivityService";
import {RecommendTodoApi} from "../api/recommend_todo/RecommendTodoApi";
import {Activity} from "./domain/Activity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PapagoApi} from "../api/translator/PapagoApi";
import {HttpModule} from "@nestjs/axios";
import {ActivityController} from "./web/ActivityController";

@Module({
  imports: [TypeOrmModule.forFeature([Activity]), HttpModule],
  controllers: [ActivityController],
  providers: [
    ActivityService, RecommendTodoApi,
    {provide: 'TranslatorApi', useClass: PapagoApi}
  ],
})
export class ActivityModule {
}
