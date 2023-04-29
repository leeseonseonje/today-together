import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {TodoService} from '../service/todo.service';
import {DateTimeUtil} from '../../../util/date-time.util';
import {ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateTodoDto} from './dto/create-todo.dto';
import {UpdateTodoDto} from './dto/update-todo.dto';
import {CompleteTodoDto} from './dto/complete-todo.dto';
import {FindDayTodosDto} from '../repository/dto/find-day-todos.dto';

@ApiTags('todo')
@Controller('/todos')
@UsePipes(new ValidationPipe())
export class TodoController {

  constructor(
    private readonly todoService: TodoService,
  ) {
  }

  @ApiOperation({ summary: '오늘 할 일 생성'})
  @ApiResponse({
    status: 201,
    description: 'todo id'
  })
  @Post()
  async create(@Body() request: CreateTodoDto) {
    return await this.todoService.create(request.memberId, request.text);
  }

  @ApiOperation({ summary: '오늘 할 일 수정'})
  @ApiResponse({
    status: 200,
    description: 'todo id'
  })
  @Patch()
  async updateText(@Body() request: UpdateTodoDto) {
    return await this.todoService.updateText(request.todoId, request.text);
  }

  @ApiOperation({ summary: '오늘 할 일 완료'})
  @ApiResponse({
    status: 201,
    description: 'todo id',
  })
  @Post('/complete')
  async complete(@Body() request: CompleteTodoDto) {
    return await this.todoService.complete(request.memberId, request.todoId);
  }

  @ApiOperation({ summary: '오늘 할 일 삭제'})
  @Delete('/:todoId')
  async removeTodo(@Param('todoId') todoId: number) {
    await this.todoService.removeTodo(todoId);
  }

  @ApiOperation({ summary: '오늘 할 일 목록 조회'})
  @ApiResponse({
    status: 200,
    type: FindDayTodosDto,
  })
  @Get('/today/:memberId')
  async todayTodo(@Param('memberId') memberId: number) {
    return await this.todoService.getTodayTodo(memberId);
  }

  @ApiOperation({ summary: '특정 날짜의 할 일 목록 조회'})
  @ApiQuery({name: 'day', type: 'date', example: '2021-11-25', description: '조회하려는 날짜'})
  @ApiResponse({
    status: 200,
    type: FindDayTodosDto,
  })
  @Get('/:memberId')
  async dayTodo(@Param('memberId') memberId: number,
                @Query('day') day: string) {
    const localDate = DateTimeUtil.toLocalDate(day);
    return await this.todoService.getDayTodos(memberId, localDate);
  }
}
