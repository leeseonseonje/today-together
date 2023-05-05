import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseTimeEntity} from '../base-time.entity';
import {LocalDate} from 'js-joda';
import {TodoStatus} from './todo-status.enum';
import {LocalDateTransformer} from 'lib/entity/transformer/local-date.transformer';

@Entity()
export class Todo extends BaseTimeEntity {

  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  readonly id: number;

  @Column({name: 'member_id'})
  memberId: string;

  @Column()
  text: string;

  @Column({
    type: 'date',
    transformer: new LocalDateTransformer(),
  })
  readonly day: LocalDate;

  @Column({type: 'varchar'})
  status: TodoStatus;

  constructor(memberId: string, text: string, day: LocalDate, status: TodoStatus) {
    super();
    this.memberId = memberId;
    this.text = text;
    this.day = day;
    this.status = status;
  }
}
