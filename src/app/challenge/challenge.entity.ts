import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseTimeEntity} from '../base-time.entity';
import {LocalDateTransformer} from '../../transformer/local-date.transformer';
import {LocalDate} from 'js-joda';

@Entity()
export class Challenge extends BaseTimeEntity {

  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  readonly id: number;

  @Column({name: 'member_id'})
  memberId: number;

  @Column({
    type: 'date',
    transformer: new LocalDateTransformer(),
  })
  readonly day: LocalDate;

  constructor(day: LocalDate) {
    super();
    this.day = day;
  }
}
