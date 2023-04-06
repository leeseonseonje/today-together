import {Test} from '@nestjs/testing';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from '../../src/db/config';
import {Activity} from '../../src/app/activity/domain/activity.entity';
import {QueryRunner} from 'typeorm';
import {TransactionUtil} from '../util/TransactionUtil';
import {ActivityType} from '../../src/app/activity/domain/activity.type.enum';

describe('ts-joda localdate transformer test', () => {
  let queryRunner: QueryRunner;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig),
        TypeOrmModule.forFeature([Activity])
      ],
    }).compile();

    queryRunner = await TransactionUtil.getTransaction();
  })

  afterEach(async () => {
    await TransactionUtil.rollback(queryRunner);
  });

  it('createdDate', async () => {
    const result = await queryRunner.manager.getRepository(Activity)
      .save(new Activity(1, 'activity', ActivityType.EDUCATION, 1));

    expect(result.createdDate).toBeTruthy();
    expect(result.modifiedDate).toBeTruthy();
  });

  it('modifiedDate', async () => {
    const activity = await queryRunner.manager.getRepository(Activity)
      .save(new Activity(1, 'activity', ActivityType.EDUCATION, 1));
    await queryRunner.manager.getRepository(Activity).update(activity.id, {activity: 'ac'});

    let result = await queryRunner.manager.getRepository(Activity).findOne({where: {key: 1}});

    expect(result.createdDate.getTime() == result.modifiedDate.getTime()).toBeFalsy();
  });
})
