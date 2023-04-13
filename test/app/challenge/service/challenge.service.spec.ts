import {Test, TestingModule} from '@nestjs/testing';
import {getConnection} from 'typeorm';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfig} from '../../../../src/db/config';
import {ChallengeService} from '../../../../src/app/challenge/service/challenge.service';
import {ChallengeModule} from '../../../../src/app/challenge/challenge.module';
import {Challenge} from '../../../../src/app/challenge/challenge.entity';
import {LocalDate, LocalDateTime} from 'js-joda';

describe('challenge Service Integration Test', () => {

  let sut: ChallengeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig), ChallengeModule],
    }).compile();

    sut = module.get<ChallengeService>(ChallengeService);
  });

  afterEach(async () => {
    // await getConnection().dropDatabase();
    await getConnection().close();
  });

  it('하루에 commit을 몇 번 한지 조회 (횟수만)', async () => {
    const repository = getConnection().getRepository(Challenge);
    for (let i = 0; i < 100; i++) {
      await repository.save(new Challenge(2, 1, LocalDateTime.now()));
    }
    for (let i = 0; i < 30; i++) {
      await repository.save(new Challenge(2, 2, LocalDateTime.now()));
    }
    for (let i = 0; i < 50; i++) {
      await repository.save(new Challenge(2, 1, LocalDateTime.now().plusDays(1)));
    }

    const result = await sut.getDayCommit(1, LocalDate.now());
    expect(result).toBe(100);
  });

  it('모든날의 commit 횟수 조회 (한달 단위)', async () => {
    const repository = getConnection().getRepository(Challenge);
    // await repository.save(new Challenge(2, 1, LocalDateTime.now()));
    // await repository.save(new Challenge(2, 1, LocalDateTime.now().plusMonths(1)));

    const result = await sut.getMonthCommit(1, LocalDate.now());

    console.log(result);
    // expect(result.length).toBe(1);
    // expect(result[0].commits).toBe(100);
  });
});
