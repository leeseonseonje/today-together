import { Module } from '@nestjs/common';
import {ActivityService} from "./ActivityService";
import {RecommendToDoApi} from "./api/RecommendToDoApi";
import {Activity} from "./Activity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PapagoApi} from "./api/translator/PapagoApi";
import {HttpModule} from "@nestjs/axios";
import {ActivityController} from "./ActivityController";
import {TranslatorApi} from "./api/translator/TranslatorApi";

@Module({
    imports: [TypeOrmModule.forFeature([Activity]), HttpModule],
    controllers: [ActivityController],
    providers: [
        ActivityService, RecommendToDoApi,
        {provide: 'TranslatorApi', useClass: PapagoApi}
    ],
})
export class ActivityModule {}
