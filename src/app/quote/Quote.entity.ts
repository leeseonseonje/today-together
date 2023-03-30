import {BaseTimeEntity} from '../BaseTimeEntity.entity';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {LocalDate} from 'js-joda';
import {LocalDateTransformer} from '../../transformer/LocalDateTransformer';

@Entity()
export class Quote extends BaseTimeEntity {

  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  readonly id: number;

  @Column()
  readonly author: string;

  @Column()
  readonly text: string;

  @Column({
    type: 'date',
    transformer: new LocalDateTransformer(),
  })
  readonly day: LocalDate

  constructor(author: string, text: string, day: LocalDate) {
    super();
    this.author = author;
    this.text = text;
    this.day = day;
  }
}
