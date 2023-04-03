import { Module } from '@nestjs/common';
import { TodosModule } from './modules/todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entity/Todo';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'mysql_db',
      entities: [Todo],
      synchronize: true,
    }),
    TodosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
