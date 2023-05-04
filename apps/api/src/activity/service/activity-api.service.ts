import {Inject, Injectable} from '@nestjs/common';
import {RecommendActivityApi} from 'lib/infra/recommend-activity/recommend-activity.api';
import {translatorApi, TranslatorApi} from 'lib/infra/translator/translator.api';
import {ActivityType} from 'lib/entity/domains/activity/activity.type.enum';
import {ResponseActivityDto} from './dto/response-activity.dto';
import {ResponseRecommendTodoApiDto} from 'lib/infra/recommend-activity/dto/response-recommend-todo-api.dto';
import {ActivityRepository} from 'lib/entity/domains/activity/activity.repository';
import {getConnection} from 'typeorm';
import {Activity} from 'lib/entity/domains/activity/activity.entity';

@Injectable()
export class ActivityApiService {
  constructor(
    private readonly recommendActivityApi: RecommendActivityApi,
    @Inject(translatorApi)
    private readonly translatorApi: TranslatorApi,
  ) {}

  async recommendTodo(type: ActivityType) {
    const apiResponse = await this.recommendActivityApi.recommendTodo(type);

    const activity = await this.getActivity(apiResponse);
    return ResponseActivityDto.toDto(activity);
  }

  private async getActivity(apiResponse: ResponseRecommendTodoApiDto) {
    const activity = await getConnection().getCustomRepository(ActivityRepository).findByKey(apiResponse.key);
    return activity ? activity : this.translator(apiResponse);
  }

  private async translator(apiResponse: ResponseRecommendTodoApiDto) {
    const translatorActivity = await this.translatorApi.translation(apiResponse.activity);
    const createActivity = new Activity(apiResponse.key, translatorActivity, apiResponse.type, apiResponse.participants);
    return await getConnection().getCustomRepository(ActivityRepository).save(createActivity);
  }
}
