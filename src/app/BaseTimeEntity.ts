import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {LocalDate} from 'js-joda';
import {LocalDateTransformer} from '../transformer/LocalDateTransformer';

export abstract class BaseTimeEntity extends BaseEntity {
  @CreateDateColumn({
    transformer: new LocalDateTransformer()
  })
  createdDate: LocalDate;

  @UpdateDateColumn({
    transformer: new LocalDateTransformer()
  })
  modifiedDate: LocalDate;
}
