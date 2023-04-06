import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseTimeEntity extends BaseEntity {
  @CreateDateColumn()
  readonly createdDate: Date;

  @UpdateDateColumn()
  readonly modifiedDate: Date;
}
