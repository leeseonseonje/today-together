import {Column, Entity, PrimaryColumn} from "typeorm";
import {BaseTimeEntity} from '../../base-time.entity';
import {ActivityType} from './activity.type.enum';

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
