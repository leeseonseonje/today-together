import {Inject, Injectable} from '@nestjs/common';
import {Activity} from '../domain/Activity.entity';
import {RecommendTodoApi} from '../api/RecommendTodoApi';
import {translatorApi, TranslatorApi} from '../../translator/TranslatorApi';
import {ActivityType} from '../domain/ActivityType';
import {RecommendTodoApiDto} from '../api/dto/RecommendTodoApiDto';
import {ActivityRepository} from '../repository/ActivityRepository';
import {Connection, getConnection} from 'typeorm';
import {ActivityRecommendDto} from './dto/ActivityRecommendDto';

@Injectable()
export class ActivityService {
  constructor(
    private readonly recommendTodoApi: RecommendTodoApi,
    @Inject(translatorApi)
    private readonly translatorApi: TranslatorApi,
  ) {}

  async recommendTodo(type: ActivityType) {
    const apiResponse = await this.recommendTodoApi.recommendTodo(type);

    const activity = await this.getActivity(apiResponse);
    return ActivityRecommendDto.toDto(activity);
  }

  private async getActivity(apiResponse: RecommendTodoApiDto) {
    const activity = await getConnection().getCustomRepository(ActivityRepository).findByKey(apiResponse.key);
    return activity ? activity : this.translator(apiResponse);
  }

  private async translator(apiResponse: RecommendTodoApiDto) {
    const translatorActivity = await this.translatorApi.translation(apiResponse.activity);
    const createActivity = new Activity(apiResponse.key, translatorActivity, apiResponse.type, apiResponse.participants);
    return await getConnection().getCustomRepository(ActivityRepository).save(createActivity);
  }
}
