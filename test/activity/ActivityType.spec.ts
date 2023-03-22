import { ActivityType } from '../../src/activity/domain/ActivityType';
import e from 'express';
import {RecommendTodoApiResponse} from '../../src/api/recommend_todo/dto/RecommendTodoApiResponse';

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

  it('ts learn', async () => {
    const data = {
      activity: 'activity',
      accessibilty: 1,
      type: 'type',
      participants: 2,
      price: 1,
      key: 1
    };
    let result = RecommendTodoApiResponse.create({
      activity: 'activity',
      accessibilty: 1,
      type: 'type',
      participants: 2,
      price: 1,
      key: 1
    });
    console.log(result.activity)
  })
});
