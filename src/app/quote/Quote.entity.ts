import {BaseTimeEntityEntity} from '../BaseTimeEntity.entity';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Quote extends BaseTimeEntityEntity{

  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly author: string;

  @Column()
  readonly quote: string;

  private constructor(author: string, quote: string) {
    super();
    this.author = author;
    this.quote = quote;
  }

  static of(author: string, quote: string) {
    return new Quote(author, quote);
  }
}
