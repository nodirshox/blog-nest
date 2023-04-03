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
import { CreatePostDto } from './dto/CreatePost.dto';
import { UpdatePostDto } from './dto/UpdatePost.dto';
import { PostsService } from './posts.service';
import { Post as PostEntity } from '../entity/Post';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  createPost(@Body() newPost: CreatePostDto): Promise<PostEntity> {
    return this.postsService.createPost(newPost);
  }

  @Get()
  getPosts(): Promise<PostEntity[]> {
    return this.postsService.getPosts();
  }

  @Get(':id')
  getPostById(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postsService.getPostById(id);
  }

  @Put('/:id')
  async updatePost(
    @Body() updatePost: UpdatePostDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return await this.postsService.updatePost(id, updatePost);
  }

  @Delete(':id')
  async deletePost(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.postsService.deletePost(id);
  }
}
