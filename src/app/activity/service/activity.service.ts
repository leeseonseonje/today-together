import {Inject, Injectable} from '@nestjs/common';
import {Activity} from '../domain/activity.entity';
import {RecommendTodoApi} from '../api/recommend-todo.api';
import {translatorApi, TranslatorApi} from '../../translator/translator.api';
import {ActivityType} from '../domain/activity.type.enum';
import {ResponseRecommendTodoApiDto} from '../api/dto/response-recommend-todo-api.dto';
import {ActivityRepository} from '../repository/activity.repository';
import {Connection, getConnection} from 'typeorm';
import {ResponseActivityDto} from './dto/response-activity.dto';

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
