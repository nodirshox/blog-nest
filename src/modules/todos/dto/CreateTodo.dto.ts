import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Read a book', description: 'Title of task' })
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  body: string;
}
