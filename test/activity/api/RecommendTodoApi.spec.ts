import { Test, TestingModule } from '@nestjs/testing';
import { RecommendTodoApi } from '../../../src/app/activity/api/RecommendTodoApi';
import { RequestActivityDto } from '../../../src/app/activity/controller/dto/RequestActivityDto';
import { ActivityType } from '../../../src/app/activity/domain/ActivityType';
import { HttpModule } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';

describe('RecommendTodoApi', () => {
  let sut: RecommendTodoApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [RecommendTodoApi],
    }).compile();

    sut = module.get<RecommendTodoApi>(RecommendTodoApi);
  });

  it('apiCall', async () => {
    const activityDto = RequestActivityDto.create(ActivityType.EDUCATION, 1);

    let result = await sut.recommendTodo(activityDto);

    expect(result.type).toBe('education');
    expect(result.participants).toBe(1);
  });

  it('apiError', async () => {
    const activityDto = RequestActivityDto.create(ActivityType.EDUCATION, 1000);

    await expect(async () => await sut.recommendTodo(activityDto)).rejects.toThrowError(BadRequestException);
  });
});
