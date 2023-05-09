import {Test} from '@nestjs/testing';
import {TypeOrmModule} from '@nestjs/typeorm';
import {getConnection,} from 'typeorm';
import {LocalDate,} from 'js-joda';
import {Quote} from 'lib/entity/domains/quote/quote.entity';
import {initDbModule} from 'lib/common/config/module-config';

describe('ts-joda local date transformer test', () => {

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [initDbModule,
        TypeOrmModule.forFeature([Quote])
      ],
    }).compile();
  })

  afterEach(async () => {
    //await getConnection().dropDatabase();
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
