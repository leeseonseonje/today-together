import { ActivityType } from '../../src/activity/ActivityType';
import e from 'express';

describe('ActivityType', () => {
  it('enumLearnTest', async () => {
    expect(ActivityType.EDUCATION).toBe('education');
  });
});
