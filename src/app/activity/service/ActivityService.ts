import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from '../domain/Activity';
import { Repository } from 'typeorm';
import { RecommendTodoApi } from '../api/RecommendTodoApi';
import { TranslatorApi } from '../../translator/TranslatorApi';
import {ActivityType} from '../domain/ActivityType';
import {RecommendTodoApiResponse} from '../api/dto/RecommendTodoApiResponse';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,

    private readonly recommendTodoApi: RecommendTodoApi,

    @Inject('TranslatorApi')
    private readonly translatorApi: TranslatorApi,
  ) {}

  async recommendTodo(type: ActivityType) {
    const apiResponse = await this.recommendTodoApi.recommendTodo(type);

    const activity = await this.getActivity(apiResponse);
  }

  private async getActivity(apiResponse: RecommendTodoApiResponse) {
    const activity = await this.activityRepository.findOneBy({
      key: apiResponse.key,
    });

    return activity ? activity : this.translator(apiResponse);
  }

  private async translator(apiResponse: RecommendTodoApiResponse) {
    const translatorActivity = await this.translatorApi.translation(apiResponse.activity);

    const createActivity = Activity.create(apiResponse.key, translatorActivity);
    return await this.activityRepository.save(createActivity);
  }
}
