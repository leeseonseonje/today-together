import {Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {ResponseRecommendTodoApiDto} from './dto/response-recommend-todo-api.dto';
import {ActivityType} from 'lib/entity/domains/activity/activity.type.enum';
import {NotActivityException} from 'lib/infra/recommend-activity/not-activity.exception';

@Injectable()
export class RecommendActivityApi {

  private readonly url: string = 'https://www.boredapi.com/api/activity';

  constructor(private readonly httpService: HttpService) {
  }


  async recommendTodo(type: ActivityType) {
    const requestUri = this.url + this.parameterBuild(type);

    const response = await this.httpService.axiosRef.get<ResponseRecommendTodoApiDto>(requestUri);

    if (response.data.error) {
      throw new NotActivityException("할 게 없습니다.");
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
