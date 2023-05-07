import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity()
export class PushToken {

  @PrimaryColumn()
  readonly token: string;

  @Column()
  readonly memberId: string;

  constructor(token: string, memberId: string) {
    this.token = token;
    this.memberId = memberId;
  }
}
