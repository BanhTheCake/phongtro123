import { UserService } from './../services/user.service';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'Auth/guards/accessToken.guard';
import { User } from 'utils/decorators/user.decorator';
import { AccessToken } from 'Auth/types/token.type';
import { updateDataUserDto } from 'User/dto/updateDataUser.dto';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get('hello')
  getHello() {
    return this.UserService.getHello();
  }

  @UseGuards(AccessTokenGuard)
  @Get('current')
  getDataCurrentUser(@User() user: AccessToken) {
    return this.UserService.getDataCurrentUser(user);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('update')
  updateDataUser(@User() user: AccessToken, @Body() data: updateDataUserDto) {
    return this.UserService.updateDataUser(user.id, data);
  }
}
