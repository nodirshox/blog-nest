import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/CreateTodo.dto';
import { UpdateTodoDto } from './dto/UpdateTodo.dto';
import { TodosService } from './todos.service';
import { Todo } from '../../entity/Todo';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Post()
  createPost(@Body() newTodo: CreateTodoDto): Promise<Todo> {
    return this.todoService.createTodo(newTodo);
  }

  @Get()
  getTodos(): Promise<Todo[]> {
    return this.todoService.getTodos();
  }

  @Get(':id')
  getTodo(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.getTodo(id);
  }

  @Put('/:id')
  async updateTodo(
    @Body() updateTodo: UpdateTodoDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return await this.todoService.updateTodo(id, updateTodo);
  }

  @Delete(':id')
  async deleteTodo(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.todoService.deleteTodo(id);
  }
}
