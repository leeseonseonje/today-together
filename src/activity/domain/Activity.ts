import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Activity {

  @PrimaryColumn()
  readonly key: number;

  @Column()
  readonly activity: string;

  private constructor(key: number, activity: string) {
    this.key = key;
    this.activity = activity;
  }

  static create(key: number, activity: string) {
    return new Activity(key, activity);
  }
}
