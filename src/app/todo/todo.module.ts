import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TodoService} from './service/todo.service';
import {Todo} from './domain/todo.entity';
import {TodoRepository} from './repository/todo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, TodoRepository])],
  providers: [TodoService,]
})
export class TodoModule {}
