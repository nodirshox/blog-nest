import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../../typeorm/entities/Post';
import { Repository } from 'typeorm';
import { CreatePostParams, UpdatePostByIdParams } from '../../../utils/types';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  getPosts() {
    return this.postRepository.find();
  }

  createPost(postDetails: CreatePostParams) {
    const newPost = this.postRepository.create({
      ...postDetails,
      createdAt: new Date(),
    });
    return this.postRepository.save(newPost);
  }

  async updatePostById(id: number, updatePostDetails: UpdatePostByIdParams) {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return this.postRepository.update({ id }, { ...updatePostDetails });
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  async deletePostById(id: number) {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return this.postRepository.delete({ id });
  }
}
