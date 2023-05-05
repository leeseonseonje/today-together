import { Activity } from "lib/entity/domains/activity/activity.entity";
import {EntityRepository, Repository} from 'typeorm';

@EntityRepository(Activity)
export class ActivityRepository extends Repository<Activity> {

  async findByKey(key: number) {
    return await this.findOne({
      where: {
        id: key,
      }
    });
  }
}
