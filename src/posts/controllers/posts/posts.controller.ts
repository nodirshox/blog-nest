import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from '../../dtos/CreatePost.dto';
import { UpdatePostDto } from '../../dtos/UpdatePost.dto';
import { PostsService } from '../../services/posts/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Get(':id')
  getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createPost(@Body() newPost: CreatePostDto) {
    return this.postsService.createPost(newPost);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  updatePostById(
    @Body() updatePost: UpdatePostDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.postsService.updatePostById(updatePost, id);
  }

  @Delete(':id')
  deletePostById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePostById(id);
  }
}
