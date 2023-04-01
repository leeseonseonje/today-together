import {EntityRepository, Repository} from 'typeorm';
import {Activity} from '../domain/Activity.entity';

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