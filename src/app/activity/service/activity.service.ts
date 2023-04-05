import {Inject, Injectable} from '@nestjs/common';
import {Activity} from '../domain/activity.entity';
import {RecommendTodoApi} from '../api/recommend-todo.api';
import {translatorApi, TranslatorApi} from '../../translator/TranslatorApi';
import {ActivityType} from '../domain/activity.type.enum';
import {RecommendTodoApiDto} from '../api/dto/recommend-todo-api.dto';
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
