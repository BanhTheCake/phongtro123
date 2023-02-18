import { AccessToken } from 'Auth/types/token.type';
import { AccessTokenGuard } from './../guards/accessToken.guard';
import { loginDto } from './../dto/login.dto';
import { AuthService } from './../services/Auth.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Query,
  UseGuards,
} from '@nestjs/common';
import { registerDto } from '../dto/register.dto';
import { Response } from 'express';
import { logoutDto } from '../dto/logout.dto';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { User } from 'utils/decorators/user.decorator';
import { changePasswordDto } from 'Auth/dto/changePassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('/register')
  register(@Body() data: registerDto) {
    return this.AuthService.register(data);
  }

  @Post('/login')
  login(@Body() data: loginDto, @Res({ passthrough: true }) res: Response) {
    return this.AuthService.login(data, res);
  }

  @Get('/logout')
  logout(@Query() data: logoutDto, @Res({ passthrough: true }) res: Response) {
    return this.AuthService.logout(data, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  handleRefreshToken(
    @User() { refreshToken }: { refreshToken: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.AuthService.handleRefresh(res, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  hello() {
    return 'i am auth controller';
  }

  @UseGuards(AccessTokenGuard)
  @Post('/change-password')
  changePassword(@Body() data: changePasswordDto, @User() user: AccessToken) {
    return this.AuthService.changePassword(data, user.id);
  }
}
