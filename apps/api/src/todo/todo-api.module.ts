import { Module } from '@nestjs/common';
import {TodoApiService} from './service/todo-api.service';
import {TodoController} from './controller/todo.controller';
import {TodoModule} from 'lib/entity/domains/todo/todo.module';

@Module({
  imports: [TodoModule],
  controllers: [TodoController,],
  providers: [TodoApiService,]
})
export class TodoApiModule {}
