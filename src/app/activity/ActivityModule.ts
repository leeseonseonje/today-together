import {Module} from '@nestjs/common';
import {ActivityService} from "./service/ActivityService";
import {RecommendTodoApi} from "./api/RecommendTodoApi";
import {Activity} from "./domain/Activity.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PapagoApi} from "../translator/PapagoApi";
import {HttpModule} from "@nestjs/axios";
import {ActivityController} from "./controller/ActivityController";
import {translatorApi} from '../translator/TranslatorApi';

@Module({
  imports: [TypeOrmModule.forFeature([Activity]), HttpModule],
  controllers: [ActivityController],
  providers: [
    ActivityService, RecommendTodoApi,
    {provide: translatorApi, useClass: PapagoApi}
  ],
})
export class ActivityModule {
}
