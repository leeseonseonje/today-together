import {Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {ActivityType} from '../domain/ActivityType';
import {RecommendTodoApiResponse} from './dto/RecommendTodoApiResponse';
import {NotActivityException} from '../exception/NotActivityException';

@Injectable()
export class RecommendTodoApi {
  constructor(private readonly httpService: HttpService) {
  }

  private readonly url: string = 'https://www.boredapi.com/api/activity';

  async recommendTodo(type: ActivityType) {
    const requestUri = this.url + this.parameterBuild(type);

    const response = await this.httpService.axiosRef.get<RecommendTodoApiResponse>(requestUri);

    if (response.data.error) {
      throw new NotActivityException("할 게 없습니다.", 400);
    }
    return response.data;
  }

  private parameterBuild(type: ActivityType) {
    if (type) {
      return `?type=${type}`;
    } else {
      return '';
    }
  }
}
