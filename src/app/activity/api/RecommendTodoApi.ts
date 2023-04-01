import {Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {ActivityType} from '../domain/ActivityType';
import {RecommendTodoApiDto} from './dto/RecommendTodoApiDto';
import {NotActivityException} from '../exception/NotActivityException';

@Injectable()
export class RecommendTodoApi {

  private readonly url: string = 'https://www.boredapi.com/api/activity';

  constructor(private readonly httpService: HttpService) {
  }


  async recommendTodo(type: ActivityType) {
    const requestUri = this.url + this.parameterBuild(type);

    const response = await this.httpService.axiosRef.get<RecommendTodoApiDto>(requestUri);

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
