import {Column, Entity, PrimaryColumn} from "typeorm";
import {BaseTimeEntity} from '../../BaseTimeEntity.entity';
import {ActivityType} from './ActivityType';

@Entity()
export class Activity extends BaseTimeEntity {

  @PrimaryColumn()
  readonly id: number;

  @Column()
  activity: string;

  @Column()
  type: ActivityType;

  @Column()
  participants: number;

  constructor(id: number, activity: string, type: ActivityType, participants: number) {
    super();
    this.id = id;
    this.activity = activity;
    this.type = type;
    this.participants = participants;
  }
}
