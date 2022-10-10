import { Module } from '@nestjs/common';
import {ActivityService} from "./ActivityService";
import {RecommendTodoApi} from "./api/RecommendTodoApi";
import {Activity} from "./Activity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PapagoApi} from "./api/translator/PapagoApi";
import {HttpModule} from "@nestjs/axios";
import {ActivityController} from "./ActivityController";

@Module({
    imports: [TypeOrmModule.forFeature([Activity]), HttpModule],
    controllers: [ActivityController],
    providers: [
        ActivityService, RecommendTodoApi,
        {provide: 'TranslatorApi', useClass: PapagoApi}
    ],
})
export class ActivityModule {}
