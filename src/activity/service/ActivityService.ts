import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from '../domain/Activity';
import { Repository } from 'typeorm';
import { RecommendTodoApi } from '../../api/recommend_todo/RecommendTodoApi';
import { TranslatorApi } from '../../api/translator/TranslatorApi';
import { RecommendTodoApiResponse } from '../../api/recommend_todo/dto/RecommendTodoApiResponse';
import {ActivityType} from '../domain/ActivityType';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,

    private readonly recommendTodoApi: RecommendTodoApi,

    @Inject('TranslatorApi')
    private readonly translatorApi: TranslatorApi,
  ) {}

  async recommendTodo(type: ActivityType, participants: number) {
    const apiResponse = await this.recommendTodoApi.apiCall(type, participants);

    return await this.getActivity(apiResponse);
  }

  private async getActivity(apiResponse: RecommendTodoApiResponse) {
    const activity = await this.activityRepository.findOneBy({
      key: apiResponse.key,
    });

    return activity ? activity : this.translator(apiResponse);
  }

  private async translator(apiResponse: RecommendTodoApiResponse) {
    // const translatorActivity = await this.translatorApi.apiCall(activity.activity);

    const createActivity = Activity.create(apiResponse.key, apiResponse.activity);
    return await this.activityRepository.save(createActivity);
  }
}
