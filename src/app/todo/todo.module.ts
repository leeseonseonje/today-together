import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TodoService} from './service/todo.service';
import {Todo} from './domain/todo.entity';
import {TodoController} from './controller/todo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController,],
  providers: [TodoService,]
})
export class TodoModule {}
