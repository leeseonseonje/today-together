import {Column, Entity, PrimaryColumn} from "typeorm";
import {BaseTimeEntityEntity} from '../../BaseTimeEntity.entity';
import {LocalDate} from 'js-joda';

@Entity()
export class Activity extends BaseTimeEntityEntity {

  @PrimaryColumn()
  readonly key: number;

  @Column()
  activity: string;

  private constructor(key: number, activity: string) {
    super();
    this.key = key;
    this.activity = activity;
    // this.createdDate = LocalDate.now();
    // this.modifiedDate = LocalDate.now();
  }

  static of(key: number, activity: string) {
    return new Activity(key, activity);
  }
}
