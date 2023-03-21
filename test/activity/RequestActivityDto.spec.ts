import { RequestActivityDto } from '../../src/activity/web/dto/RequestActivityDto';
import { ActivityType } from '../../src/activity/domain/ActivityType';

describe('RequestActivityDto', () => {
  it('parameterBuild', async () => {
    const sut = RequestActivityDto.create(ActivityType.EDUCATION, 2);

    let result = sut.paramBuild();

    expect(result).toBe('?type=education&participants=2')
  });
});
