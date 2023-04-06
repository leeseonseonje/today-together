import {Test} from '@nestjs/testing';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from '../../src/db/config';
import {getConnection, QueryRunner} from 'typeorm';
import {Quote} from '../../src/app/quote/quote.entity';
import {LocalDate} from 'js-joda';
import {TransactionUtil} from '../util/TransactionUtil';

describe('ts-joda local date transformer test', () => {
  let queryRunner: QueryRunner;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig),
        TypeOrmModule.forFeature([Quote])
      ],
    }).compile();

    queryRunner = await TransactionUtil.getTransaction();
  })

  afterEach(async () => {
    await TransactionUtil.rollback(queryRunner);
  });

  it('date to Local date Test', async () => {
    const now = LocalDate.now();
    const quoteRepository = queryRunner.manager.getRepository(Quote);
    const quote = await quoteRepository.save(new Quote('text', 'author', now));
    const result = await quoteRepository.findOne({
      where: {
        id: quote.id,
      }
    });
    expect(result.day.isEqual(now)).toBeTruthy();
  });
})
