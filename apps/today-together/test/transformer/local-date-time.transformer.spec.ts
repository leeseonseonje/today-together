import {Test} from '@nestjs/testing';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from '../../src/db/config';
import {getConnection} from 'typeorm';
import {LocalDate, LocalDateTime} from 'js-joda';
import {Challenge} from '../../src/app/challenge/challenge.entity';

describe('ts-joda local date time transformer test', () => {

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig),
        TypeOrmModule.forFeature([Challenge])
      ],
    }).compile();
  })

  afterEach(async () => {
    await getConnection().dropDatabase();
    await getConnection().close();
  });

  it('date to Local date time Test', async () => {
    const repository = getConnection().getRepository(Challenge);
    const challenge = await repository.save(
      new Challenge(1, 2, LocalDateTime.now())
    );

    const result = await repository.findOne({
      where: {
        id: challenge.id
      }
    });

    expect(result.commitTime).toBeInstanceOf(LocalDateTime);
  });
})
