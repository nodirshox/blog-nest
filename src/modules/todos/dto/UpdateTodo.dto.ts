import { IsNotEmpty } from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;
}
