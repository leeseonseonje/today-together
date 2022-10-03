import {Inject, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Activity} from "./Activity";
import {Repository} from "typeorm";
import {RecommendToDoApi} from "./api/RecommendToDoApi";
import {TranslatorApi} from "./api/translator/TranslatorApi";
import {RequestActivityDto} from "./RequestActivityDto";
import {RecommendToDoApiResponse} from "./api/dto/RecommendToDoApiResponse";

@Injectable()
export class ActivityService {
    constructor(
        @InjectRepository(Activity)
        private readonly activityRepository: Repository<Activity>,
        private readonly recommendTodoApi: RecommendToDoApi,
        @Inject('TranslatorApi')
        private readonly translatorApi: TranslatorApi,
    ) {
    }

    async recommendToDo(request: RequestActivityDto) {
        const apiResponse = await this.recommendTodoApi.apiCall(request);

        return await this.getActivity(apiResponse) as Activity;
    }

    private async getActivity(apiResponse: RecommendToDoApiResponse) {
        const activity = await this.activityRepository.findOneBy({key: apiResponse.key});

        return activity === null ? this.translator(apiResponse) : activity;
    }

    private async translator(activity: RecommendToDoApiResponse) {
        const translatorActivity = await this.translatorApi.apiCall(activity.activity);

        const createActivity = Activity.create(activity.key, translatorActivity);
        return await this.activityRepository.save(createActivity);
    }
}