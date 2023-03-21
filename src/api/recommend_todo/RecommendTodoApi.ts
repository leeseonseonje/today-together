import {BadRequestException, Injectable} from '@nestjs/common';
import {RecommendTodoApiResponse} from './dto/RecommendTodoApiResponse';
import {RequestActivityDto} from '../../activity/web/dto/RequestActivityDto';
import {HttpService} from '@nestjs/axios';
import {ActivityType} from '../../activity/domain/ActivityType';

@Injectable()
export class RecommendTodoApi {
  private readonly url: string = 'https://www.boredapi.com/api/activity';
  constructor(private readonly httpService: HttpService) {}

  async apiCall(type: ActivityType, participants: number) {
    const request = this.url + this.paramBuild(type, participants);

    const response = await this.httpService.axiosRef.get(request);
    if (response.data.error !== undefined) {
      throw new BadRequestException('할 게 없습니다.');
    }

    return RecommendTodoApiResponse.create(response.data)
  }

  private paramBuild(type: ActivityType, participants: number) {
    return `?type=${type}&participants=${participants}`;
  }
}
