import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

import {BaseTimeEntity} from '../base-time.entity';

@Entity()
export class Member extends BaseTimeEntity {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  readonly email: string;

  @Column()
  readonly name: string;

  constructor(id: string, email: string, name: string) {
    super();
    this.id = id;
    this.email = email;
    this.name = name;
  }
}
