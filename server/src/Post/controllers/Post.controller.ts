import { AccessTokenGuard } from 'Auth/guards/accessToken.guard';
import { AccessToken } from 'Auth/types/token.type';
import { createNewPostDto } from './../dto/createNewPost.dto';
import { PostService } from './../services/Post.service';
import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { allPostsPagination } from '../dto/allPostsPagination.dto';
import { getNewPostsDto } from '../dto/getNewPosts.dto';
import { User } from 'utils/decorators/user.decorator';
import { updatePostDto } from 'Post/dto/updatePost.dto';
import { getOwnerPosts } from 'Post/dto/getOwnerPosts';

@Controller('post')
export class PostController {
  constructor(private PostService: PostService) {}

  @Get('hello')
  hello() {
    return 'Hello i am Post controller';
  }

  @Get('all/pagination')
  getAllPostsPagination(
    @Query()
    { limit = 5, page = 1, order = 'star', ...query }: allPostsPagination,
  ) {
    return this.PostService.getAllPostsPagination({
      limit,
      page,
      order,
      ...query,
    });
  }

  @Get('all')
  getAllPosts() {
    return this.PostService.getAllPosts();
  }

  @Get('new-posts')
  getNewPosts(@Query() { limit = 5 }: getNewPostsDto) {
    return this.PostService.getNewPosts({ limit });
  }

  @Get('/current-post/:id')
  getCurrentPost(@Param('id') id: string) {
    return this.PostService.getCurrentPost(id);
  }

  @Get('/details-post/:id')
  getDetailsPost(@Param('id') id: string) {
    return this.PostService.getDetailsPost(id);
  }

  @UseGuards(AccessTokenGuard)
  @Get('owner-posts')
  getOwnerPosts(
    @User() user: AccessToken,
    @Query() { status = 'all' }: getOwnerPosts,
  ) {
    return this.PostService.getOwnerPosts(user.id, status);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/update/:id')
  updatePost(@Body() data: updatePostDto, @Param('id') id: string) {
    return this.PostService.handleUpdatePost(data, id);
  }

  @UseGuards(AccessTokenGuard)
  @Post('create')
  createNewPost(@Body() data: createNewPostDto, @User() user: AccessToken) {
    return this.PostService.createNewPost(data, user);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/delete/:id')
  deletePostById(@Param('id') id: string) {
    return this.PostService.deletePostById(id);
  }
}
