import {Injectable} from '@nestjs/common';
import {RecommendTodoApiResponse} from './dto/RecommendTodoApiResponse';
import {HttpService} from '@nestjs/axios';
import {ActivityType} from '../../activity/domain/ActivityType';
import {NotActivityException} from '../../activity/exception/NotActivityException';

@Injectable()
export class RecommendTodoApi {
  private readonly url: string = 'https://www.boredapi.com/api/activity';

  constructor(private readonly httpService: HttpService) {
  }

  async apiCall(type: ActivityType) {
    const requestUri = this.url + this.parameterBuild(type);

    const response = await this.httpService.axiosRef.get(requestUri);
    if (response.data.error !== undefined) {
      throw new NotActivityException('할 게 없습니다.', 400);
    }

    return RecommendTodoApiResponse.create(response.data)
  }

  private parameterBuild(type: ActivityType) {
    if (type) {
      return `?type=${type}`;
    } else {
      return '';
    }
  }
}
