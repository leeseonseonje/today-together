import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './Activity';
import { Repository } from 'typeorm';
import { RecommendTodoApi } from './api/RecommendTodoApi';
import { TranslatorApi } from './api/translator/TranslatorApi';
import { RequestActivityDto } from './RequestActivityDto';
import { RecommendTodoApiResponse } from './api/dto/RecommendTodoApiResponse';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,

    private readonly recommendTodoApi: RecommendTodoApi,

    @Inject('TranslatorApi')
    private readonly translatorApi: TranslatorApi,
  ) {}

  async recommendTodo(request: RequestActivityDto) {
    const apiResponse = await this.recommendTodoApi.apiCall(request);

    return (await this.getActivity(apiResponse)) as Activity;
  }

  private async getActivity(apiResponse: RecommendTodoApiResponse) {
    const activity = await this.activityRepository.findOneBy({
      key: apiResponse.key,
    });

    return activity ? activity : this.translator(apiResponse);
  }

  private async translator(activity: RecommendTodoApiResponse) {
    // const translatorActivity = await this.translatorApi.apiCall(activity.activity);

    const createActivity = Activity.create(activity.key, activity.activity);
    return await this.activityRepository.save(createActivity);
  }
}
