import { PostService } from './services/Post.service';
import { PostController } from './controllers/Post.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
