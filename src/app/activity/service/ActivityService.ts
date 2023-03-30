import {Inject, Injectable} from '@nestjs/common';
import {Activity} from '../domain/Activity.entity';
import {RecommendTodoApi} from '../api/RecommendTodoApi';
import {translatorApi, TranslatorApi} from '../../translator/TranslatorApi';
import {ActivityType} from '../domain/ActivityType';
import {RecommendTodoApiResponse} from '../api/dto/RecommendTodoApiResponse';
import {ActivityRepository} from '../repository/ActivityRepository';
import {Connection, getConnection} from 'typeorm';

@Injectable()
export class ActivityService {
  constructor(
    private readonly recommendTodoApi: RecommendTodoApi,
    @Inject(translatorApi)
    private readonly translatorApi: TranslatorApi,
  ) {}

  async recommendTodo(type: ActivityType) {
    const apiResponse = await this.recommendTodoApi.recommendTodo(type);
    return await this.getActivity(apiResponse);
  }

  private async getActivity(apiResponse: RecommendTodoApiResponse) {
    const activity = await getConnection().getCustomRepository(ActivityRepository).findByKey(apiResponse.key);
    return activity ? activity : this.translator(apiResponse);
  }

  private async translator(apiResponse: RecommendTodoApiResponse) {
    const translatorActivity = await this.translatorApi.translation(apiResponse.activity);

    const createActivity = Activity.of(apiResponse.key, translatorActivity);
    return await getConnection().getCustomRepository(ActivityRepository).save(createActivity);
  }
}
