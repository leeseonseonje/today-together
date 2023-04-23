import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {BaseTimeEntity} from '../base-time.entity';

@Entity()
export class Member extends BaseTimeEntity {

  @PrimaryColumn()
  readonly oauth_id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  constructor(oauth_id: string, email: string, name: string) {
    super();
    this.oauth_id = oauth_id;
    this.email = email;
    this.name = name;
  }
}
