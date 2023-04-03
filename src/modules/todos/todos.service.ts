import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../../entity/Todo';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/CreateTodo.dto';
import { UpdateTodoDto } from './dto/UpdateTodo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  createTodo(todoDetails: CreateTodoDto): Promise<Todo> {
    const newTodo = this.todoRepository.create({ ...todoDetails });
    return this.todoRepository.save(newTodo);
  }

  getTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async getTodo(id: number): Promise<Todo> {
    return await this.checkTodoById(id);
  }

  async updateTodo(id: number, updateTodo: UpdateTodoDto): Promise<void> {
    await this.checkTodoById(id);

    await this.todoRepository.update(id, updateTodo);
  }

  async deleteTodo(id: number): Promise<void> {
    await this.checkTodoById(id);

    await this.todoRepository.delete({ id });
  }

  private async checkTodoById(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });

    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }

    return todo;
  }
}
