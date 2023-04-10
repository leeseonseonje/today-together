import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {TodoService} from '../service/todo.service';
import {DateUtils} from 'typeorm/util/DateUtils';
import {DateTimeUtil} from '../../../util/date-time.util';

@Controller('/todos')
export class TodoController {

  constructor(
    private readonly todoService: TodoService,
  ) {
  }

  @Post()
  async save(@Body() request: { memberId: number, text: string }) {
    await this.todoService.save(request.memberId, request.text);
  }

  @Patch()
  async updateText(@Body() request: { todoId: number, text: string }) {
    await this.todoService.updateText(request.todoId, request.text);
  }

  @Post('/complete')
  async complete(@Body() id: number) {
    await this.todoService.complete(id);
  }

  @Delete('/:todoId')
  async removeTodo(@Param('todoId') todoId: number) {
    return await this.todoService.removeTodo(todoId);
  }

  @Get('/today/:memberId')
  async todayTodo(@Param('memberId') memberId: number) {
    return await this.todoService.getTodayTodo(memberId);
  }

  @Get('/:memberId')
  async dayTodo(@Param('memberId') memberId: number,
                @Query('day') day: string) {
    const localDate = DateTimeUtil.toLocalDate(day);
    return await this.todoService.getDayTodos(memberId, localDate);
  }
}
