import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseTimeEntity} from '../base-time.entity';

@Entity()
export class Member extends BaseTimeEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  readonly id: number;

  @Column()
  email: string;

  constructor(email: string) {
    super();
    this.email = email;
  }
}
