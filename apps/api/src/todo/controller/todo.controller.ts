import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {TodoApiService} from '../service/todo-api.service';
import {ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateTodoDto} from './dto/create-todo.dto';
import {UpdateTodoDto} from './dto/update-todo.dto';
import {CompleteTodoDto} from './dto/complete-todo.dto';
import {FindDayTodosDto} from '../service/dto/find-day-todos.dto';
import {DateTimeUtil} from 'lib/entity/util/date-time.util';

@ApiTags('todo')
@Controller('/todos')
@UsePipes(new ValidationPipe())
export class TodoController {

  constructor(
    private readonly todoService: TodoApiService,
  ) {
  }

  @ApiOperation({summary: '오늘 할 일 생성'})
  @ApiResponse({
    status: 201,
    description: 'todo id'
  })
  @Post()
  async create(@Body() request: CreateTodoDto) {
    return await this.todoService.create(request.memberId, request.text);
  }

  @ApiOperation({summary: '오늘 할 일 수정'})
  @ApiResponse({
    status: 200,
    description: 'todo id'
  })
  @Patch()
  async updateText(@Body() request: UpdateTodoDto) {
    return await this.todoService.updateText(request.todoId, request.text);
  }

  @ApiOperation({summary: '오늘 할 일 완료'})
  @ApiResponse({
    status: 200,
    description: 'todo id',
  })
  @Post('/complete')
  @HttpCode(200)
  async complete(@Body() request: CompleteTodoDto) {
    return await this.todoService.complete(request.memberId, request.todoId);
  }

  @ApiOperation({summary: '오늘 할 일 삭제'})
  @Delete('/:todoId')
  async removeTodo(@Param('todoId') todoId: number) {
    await this.todoService.removeTodo(todoId);
  }

  @ApiOperation({summary: '오늘 할 일 목록 조회'})
  @ApiParam({name: 'memberId', type: 'number', example: '1', description: 'oauth id'})
  @ApiResponse({
    status: 200,
    type: FindDayTodosDto,
  })
  @Get('/today/:memberId')
  async todayTodo(@Param('memberId') memberId: string) {
    return await this.todoService.getTodayTodos(memberId);
  }

  @ApiOperation({summary: '요청 받은 날짜의 할 일 목록 조회'})
  @ApiParam({name: 'memberId', type: 'number', example: '1', description: 'oauth id'})
  @ApiQuery({name: 'day', type: 'date', example: '2021-11-25', description: '조회하려는 날짜'})
  @ApiResponse({
    status: 200,
    type: FindDayTodosDto,
  })
  @Get('/:memberId')
  async dayTodo(@Param('memberId') memberId: string,
                @Query('day') day: string) {
    const localDate = DateTimeUtil.toLocalDate(day);
    return await this.todoService.getDayTodos(memberId, localDate);
  }
}
