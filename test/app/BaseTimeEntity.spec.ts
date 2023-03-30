import {Test} from '@nestjs/testing';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from '../../src/db/config';
import {Activity} from '../../src/app/activity/domain/Activity.entity';
import {getConnection, QueryRunner} from 'typeorm';
import {TransactionUtil} from '../util/TransactionUtil';

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
    let result = await queryRunner.manager.getRepository(Activity).save(Activity.of(1, 'activity'));

    expect(result.createdDate).toBeTruthy();
    expect(result.modifiedDate).toBeTruthy();
  });

  it('modifiedDate', async () => {
    let activity = await queryRunner.manager.getRepository(Activity).save(Activity.of(1, 'activity'));
    await queryRunner.manager.getRepository(Activity).update(activity.key, {activity: 'ac'});

    let result = await queryRunner.manager.getRepository(Activity).findOne({where: {key: 1}});

    expect(result.createdDate.getTime() == result.modifiedDate.getTime()).toBeFalsy();
  });
})
