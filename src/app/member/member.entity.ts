import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {BaseTimeEntity} from '../base-time.entity';

@Entity()
export class Member extends BaseTimeEntity {

  @PrimaryColumn()
  readonly oauth_id: string;

  @Column()
  email: string;

  constructor(oauth_id: string, email: string) {
    super();
    this.oauth_id = oauth_id;
    this.email = email;
  }
}
