import { ActivityType } from '../../src/activity/domain/ActivityType';

describe('ActivityType', () => {
  it('enumLearnTest', async () => {
    expect(ActivityType.EDUCATION).toBe('education');
    expect(ActivityType.RECREATIONAL).toBe('recreational');
    expect(ActivityType.SOCIAL).toBe('social');
    expect(ActivityType.DIY).toBe('diy');
    expect(ActivityType.CHARITY).toBe('charity');
    expect(ActivityType.COOKING).toBe('cooking');
    expect(ActivityType.RELAXATION).toBe('relaxation');
    expect(ActivityType.MUSIC).toBe('music');
    expect(ActivityType.BUSYWORK).toBe('busywork');
    expect(ActivityType.ETC).toBe('');
  });
});
