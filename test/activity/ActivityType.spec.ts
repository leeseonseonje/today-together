import { ActivityType } from '../../src/activity/domain/ActivityType';
import e from 'express';

describe('ActivityType', () => {
  it('enumLearnTest', async () => {
    expect(ActivityType.EDUCATION).toBe('education');
  });
});
