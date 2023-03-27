import {Column, Entity, PrimaryColumn} from "typeorm";
import {BaseTimeEntity} from '../../BaseTimeEntity';

@Entity()
export class Activity extends BaseTimeEntity {

  @PrimaryColumn()
  readonly key: number;

  @Column()
  readonly activity: string;

  private constructor(key: number, activity: string) {
    super();
    this.key = key;
    this.activity = activity;
  }

  static of(key: number, activity: string) {
    return new Activity(key, activity);
  }
}
