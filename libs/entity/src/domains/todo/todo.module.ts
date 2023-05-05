import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Todo} from 'lib/entity/domains/todo/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
})
export class TodoModule {}
