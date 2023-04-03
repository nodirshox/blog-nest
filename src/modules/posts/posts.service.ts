import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post as PostEntity, Post } from '../entity/Post';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/CreatePost.dto';
import { UpdatePostDto } from './dto/UpdatePost.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  createPost(postDetails: CreatePostDto): Promise<PostEntity> {
    const newPost = this.postRepository.create({ ...postDetails });
    return this.postRepository.save(newPost);
  }

  getPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async getPostById(id: number): Promise<Post> {
    return await this.checkPostById(id);
  }

  async updatePost(
    id: number,
    updatePostDetails: UpdatePostDto,
  ): Promise<void> {
    await this.checkPostById(id);

    await this.postRepository.update(id, updatePostDetails);
  }

  async deletePost(id: number): Promise<void> {
    await this.checkPostById(id);

    await this.postRepository.delete({ id });
  }

  private async checkPostById(id: number): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return post;
  }
}
