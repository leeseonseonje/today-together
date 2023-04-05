import {Column, PrimaryGeneratedColumn} from 'typeorm';
import {BaseTimeEntity} from '../../BaseTimeEntity.entity';
import {LocalDateTransformer} from '../../../transformer/LocalDateTransformer';
import {LocalDate} from 'js-joda';
import {TodoStatus} from './TodoStatus';

export class Todo extends BaseTimeEntity {

  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  readonly id: number;

  @Column()
  text: string;

  @Column({
    type: 'date',
    transformer: new LocalDateTransformer(),
  })
  readonly day: LocalDate;

  status: TodoStatus;

  constructor(text: string, day: LocalDate, status: TodoStatus) {
    super();
    this.text = text;
    this.day = day;
    this.status = status;
  }
}
