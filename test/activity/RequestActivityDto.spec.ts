import { RequestActivityDto } from '../../src/activity/RequestActivityDto';
import { ActivityType } from '../../src/activity/ActivityType';

describe('RequestActivityDto', () => {
  it('parameterBuild', async () => {
    const sut = RequestActivityDto.create(ActivityType.EDUCATION, 2);

    let result = sut.paramBuild();

    expect(result).toBe('?type=education&participants=2')
  });
});
