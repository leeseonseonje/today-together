import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseTimeEntity} from '../base-time.entity';
import {LocalDateTransformer} from '../../../transformer/local-date.transformer';
import {LocalDate} from 'js-joda';
import {TodoStatus} from './todo-status.enum';

@Entity()
export class Todo extends BaseTimeEntity {

  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  readonly id: number;

  @Column({name: 'member_id'})
  memberId: number;

  @Column()
  text: string;

  @Column({
    type: 'date',
    transformer: new LocalDateTransformer(),
  })
  readonly day: LocalDate;

  @Column()
  status: TodoStatus;

  constructor(memberId: number, text: string, day: LocalDate, status: TodoStatus) {
    super();
    this.memberId = memberId;
    this.text = text;
    this.day = day;
    this.status = status;
  }
}
