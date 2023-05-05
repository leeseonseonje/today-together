import {BaseTimeEntity} from '../base-time.entity';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {LocalDate} from 'js-joda';
import {LocalDateTransformer} from 'lib/entity/transformer/local-date.transformer';

@Entity()
export class Quote extends BaseTimeEntity {

  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  readonly id: number;

  @Column()
  readonly text: string;

  @Column()
  readonly author: string;

  @Column({
    type: 'date',
    transformer: new LocalDateTransformer(),
  })
  readonly day: LocalDate;

  constructor(text: string, author: string, day: LocalDate) {
    super();
    this.text = text;
    this.author = author;
    this.day = day;
  }
}
