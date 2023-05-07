import {Injectable} from '@nestjs/common';
import {getConnection, In} from 'typeorm';
import {Todo} from 'lib/entity/domains/todo/todo.entity';
import {LocalDate} from 'js-joda';
import {TodoStatus} from 'lib/entity/domains/todo/todo-status.enum';
import {PushToken} from 'lib/entity/domains/member/push/push-token.entity';

@Injectable()
export class PushRepository {

  async findIncompleteMemberIds(day: LocalDate): Promise<string[]> {
    const query = await getConnection().getRepository(Todo)
      .createQueryBuilder('t')
      .distinct(true)
      .select('t.memberId', 'memberId')
      .where('t.day = :day', {day: day.toString()})
      .andWhere('t.status = :status', {status: TodoStatus.INCOMPLETE})
      .getRawMany();

    return query.map(q => {
      return q.memberId
    });
  }

  async findPushToken(memberIds: string[]) {
    const query = await getConnection().getRepository(PushToken).find({
      select: ["token"],
      where: {
        memberId: In(memberIds),
      }
    });

    return query.map(q => {
      return q.token;
    });
  }
}
