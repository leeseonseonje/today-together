import {ActivityType} from "../../src/activity/ActivityType";
import e from "express";

describe('ActivityType', () => {

    it('enumLearnTest', async () => {
        expect(ActivityType.EDUCATION).toBe('education');
    });

    it('reverseMapping', async () => {
        let education = ActivityType.EDUCATION;
        let activityTypeElement = ActivityType[1];
        console.log(education);
        console.log(activityTypeElement);
    });
});