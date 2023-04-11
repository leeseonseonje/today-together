import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseTimeEntity} from '../base-time.entity';
import {LocalDateTime} from 'js-joda';
import {LocalDateTimeTransformer} from '../../transformer/local-date-time.transformer';

@Entity()
export class Challenge extends BaseTimeEntity {

  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  readonly id: number;

  @Column({name: 'todo_id'})
  todoId: number;

  @Column({name: 'member_id'})
  memberId: number;

  @Column()
  commits: number;

  @Column({
    name: 'commit_time',
    type: 'timestamp',
    transformer: new LocalDateTimeTransformer(),
  })
  readonly commitTime: LocalDateTime;

  constructor(todoId: number, memberId: number, commits: number, commitTime: LocalDateTime) {
    super();
    this.todoId = todoId;
    this.memberId = memberId;
    this.commits = commits;
    this.commitTime = commitTime;
  }
}
