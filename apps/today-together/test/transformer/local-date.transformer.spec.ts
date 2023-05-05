import {Test} from '@nestjs/testing';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from '../../src/db/config';
import {getConnection,} from 'typeorm';
import {Quote} from '../../src/app/quote/quote.entity';
import {LocalDate,} from 'js-joda';

describe('ts-joda local date transformer test', () => {

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig),
        TypeOrmModule.forFeature([Quote])
      ],
    }).compile();
  })

  afterEach(async () => {
    await getConnection().dropDatabase();
    await getConnection().close();
  });

  it('date to Local date Test', async () => {
    const repository = getConnection().getRepository(Quote);
    const quote = await repository.save(new Quote('text', 'author', LocalDate.now()));

    const result = await repository.findOne({
      where: {
        id: quote.id,
      }
    });
    expect(result.day).toBeInstanceOf(LocalDate);
  });
})
