import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../../dtos/CreatePost.dto';
import { UpdatePostDto } from '../../dtos/UpdatePost.dto';

@Injectable()
export class PostsService {
  private mockPosts = [
    { id: '1', title: 'Getting started with NestJS.', body: 'Lorem ipsum...' },
    { id: '2', title: 'Microservices for kids', body: 'Lorem ipsum...' },
  ];

  getPosts() {
    return this.mockPosts;
  }

  createPost(newPost: CreatePostDto) {
    // business logic
    console.log(newPost);
    return;
  }

  updatePostById(updatePost: UpdatePostDto, id: number) {
    // business logic
    console.log(updatePost, id);
    return;
  }

  getPostById(id: number) {
    // business logic
    console.log(id);
    return this.mockPosts[0];
  }

  deletePostById(id: number) {
    // business logic
    console.log(id);
    return;
  }
}
