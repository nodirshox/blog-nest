import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from '../../dtos/CreatePost.dto';
import { UpdatePostDto } from '../../dtos/UpdatePost.dto';

@Controller('posts')
export class PostsController {
  @Get()
  getPosts() {
    return [
      { id: '1', title: 'Getting started with NestJS', body: 'Lorem ipsum...' },
      { id: '2', title: 'Microservices for kids', body: 'Lorem ipsum...' },
    ];
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    console.log(id);
    return {
      id: '1',
      title: 'Getting started with NestJS',
      body: 'Lorem ipsum...',
    };
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createPost(@Body() newPost: CreatePostDto) {
    console.log(newPost);
    return;
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  updatePostById(@Body() updatePost: UpdatePostDto, @Param('id') id: string) {
    console.log(id, updatePost);
    return;
  }

  @Delete(':id')
  deletePostById(@Param('id') id: string) {
    console.log(id);
    return;
  }
}
