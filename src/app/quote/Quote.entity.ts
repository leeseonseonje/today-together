import {BaseTimeEntity} from '../BaseTimeEntity';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Quote extends BaseTimeEntity{

  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly author: string;

  @Column()
  readonly quote: string;

  constructor(id: number, author: string, quote: string) {
    super();
    this.author = author;
    this.quote = quote;
  }
}
