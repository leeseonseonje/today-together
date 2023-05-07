import {ChallengeApiService} from '../../../src/challenge/service/challenge-api.service';
import {Test} from '@nestjs/testing';
import {getConnection} from 'typeorm';
import {Challenge} from 'lib/entity/domains/challenge/challenge.entity';
import {LocalDate, LocalDateTime} from 'js-joda';
import {TodoStatus} from 'lib/entity/domains/todo/todo-status.enum';
import {Todo} from 'lib/entity/domains/todo/todo.entity';
import {ChallengeApiModule} from '../../../src/challenge/challenge-api.module';
import {dbConfig} from '../../../../../libs/common/test/test-config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TodoModule} from 'lib/entity/domains/todo/todo.module';

describe('challenge Api Service Integration Test', () => {

  let sut: ChallengeApiService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfig), ChallengeApiModule, TodoModule],
    }).compile()

    sut = module.get<ChallengeApiService>(ChallengeApiService);
  });

  afterEach(async () => {
    await getConnection().dropDatabase();
    await getConnection().close();
  });

  it('하루에 commit을 몇 번 한지 조회 (횟수만 반환)', async () => {
    const repository = getConnection().getRepository(Challenge);
    for (let i = 0; i < 100; i++) {
      await repository.save(new Challenge(2, 'memberA', LocalDateTime.now()));
    }
    for (let i = 0; i < 30; i++) {
      await repository.save(new Challenge(2, 'memberB', LocalDateTime.now()));
    }
    for (let i = 0; i < 50; i++) {
      await repository.save(new Challenge(2, 'memberA', LocalDateTime.now().plusDays(1)));
    }

    const result = await sut.getDayCommitCount('memberA', LocalDate.now());

    expect(result).toBe(100);
  });

  it('요청 받은 달의 commit 횟수 조회 (한달 단위)', async () => {
    const repository = getConnection().getRepository(Challenge);
    for (let i = 0; i < 100; i++) {
      await repository.save(new Challenge(2, 'memberA', LocalDateTime.now()));
    }
    for (let i = 0; i < 30; i++) {
      await repository.save(new Challenge(2, 'memberA', LocalDateTime.now()));
    }
    for (let i = 0; i < 50; i++) {
      await repository.save(new Challenge(2, 'memberA', LocalDateTime.now().plusMonths(1)));
    }

    const result = await sut.getMonthCommit('memberA', LocalDate.now());

    expect(result[0].commits).toBe(130);
  });

  it('요청 받은 날짜의 commit 상세 내역 (하루 단위)', async () => {
    const challengeRepository = getConnection().getRepository(Challenge);
    const todoRepository = getConnection().getRepository(Todo)
    for (let i = 1; i <= 10; i++) {
      await todoRepository.save(new Todo('memberA', 'todo', LocalDate.now(), TodoStatus.COMPLETE));
      await challengeRepository.save(new Challenge(i, 'memberA', LocalDateTime.now()));
    }
    for (let i = 11; i < 50; i++) {
      await todoRepository.save(new Todo('memberA', 'todo', LocalDate.now().plusDays(1), TodoStatus.COMPLETE));
      await challengeRepository.save(new Challenge(i, 'memberA', LocalDateTime.now().plusDays(1)));
    }

    const result = await sut.dayCommitHistory('memberA', LocalDate.now());

    expect(result).toHaveLength(10);
  });
});
