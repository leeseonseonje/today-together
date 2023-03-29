import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseTimeEntityEntity extends BaseEntity {
  @CreateDateColumn()
  readonly createdDate: Date;

  @UpdateDateColumn()
  readonly modifiedDate: Date;
}
