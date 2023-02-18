import { IResp } from './../../../../client/utils/interfaces/interfaces';
import { RefreshToken } from './../types/token.type';
import { logoutDto } from './../dto/logout.dto';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common/exceptions';
import * as argon2 from 'argon2';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { cookieConfig } from '../config/cookies.config';
import { registerDto } from '../dto/register.dto';
import { User } from './../../Models/Entity/users.model';
import { response } from './../../utils/types/response.type';
import { loginDto } from './../dto/login.dto';
import { tokenService } from './Jwt.service';
import * as lodash from 'lodash';
import { changePasswordDto } from 'Auth/dto/changePassword.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER') private UserModel: typeof User,
    private tokenService: tokenService,
  ) {}

  async register(data: registerDto): Promise<response> {
    try {
      const dataUser = await this.UserModel.findOrCreate({
        where: { phone: data.phone },
        defaults: {
          name: data.name,
          phone: data.phone,
          password: await argon2.hash(data.password),
          id: uuidv4(),
        },
      });

      return {
        errCode: dataUser[1] ? 0 : 1,
        msg: dataUser[1]
          ? 'Register success !'
          : 'Phone has been register in our system !',
      };
    } catch (error) {
      if (error.response) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Something wrong with server ! ' + error,
      );
    }
  }

  async login(data: loginDto, res: Response): Promise<response> {
    try {
      const currentUser = await this.UserModel.findOne({
        where: { phone: data.phone },
      });

      // Check user is exist in database
      if (!currentUser) {
        return {
          errCode: 1,
          msg: 'Phone or password is incorrect !',
        };
      }

      // Check password is match with password store in database
      const isMatch = await argon2.verify(currentUser.password, data.password);
      if (!isMatch) {
        return {
          errCode: 1,
          msg: 'Phone or password is incorrect !',
        };
      }

      // generate access and refresh token
      const accessToken = this.tokenService.generateAccessToken({
        id: currentUser.id,
        name: currentUser.name,
      });
      const refreshToken = this.tokenService.generateRefreshToken({
        id: currentUser.id,
        name: currentUser.name,
      });

      // Set refreshToken in cookie
      res.cookie('refreshToken', refreshToken, cookieConfig);

      // Save refreshToken in database
      currentUser.refreshToken = refreshToken;
      await currentUser.save();

      // Remove password and refreshToken in user
      const plainUser = currentUser.get({ plain: true });
      const returnUser = lodash.omit(plainUser, ['password', 'refreshToken']);

      return {
        errCode: 0,
        msg: 'Ok',
        data: {
          token: accessToken,
          user: returnUser,
        },
      };
    } catch (error) {
      if (error.response) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Something wrong with server ! ' + error,
      );
    }
  }

  async logout({ id }: logoutDto, res: Response): Promise<response> {
    try {
      const currentUser = await this.UserModel.findOne({ where: { id } });
      if (!currentUser) {
        throw new BadRequestException('user is not exist in out system !');
      }
      res.cookie('refreshToken', '', cookieConfig);
      currentUser.refreshToken = null;
      await currentUser.save();
      return {
        errCode: 0,
        msg: 'Ok',
      };
    } catch (error) {
      if (error.response) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Something wrong with server ! ' + error,
      );
    }
  }

  async handleRefresh(res: Response, refreshToken: string): Promise<response> {
    try {
      const currentUser = await this.UserModel.findOne({
        where: { refreshToken },
      });
      if (!currentUser) {
        throw new UnauthorizedException();
      }
      const newAccessToken = this.tokenService.generateAccessToken({
        id: currentUser.id,
        name: currentUser.name,
      });
      const newRefreshToken = this.tokenService.generateRefreshToken({
        id: currentUser.id,
        name: currentUser.name,
      });

      res.cookie('refreshToken', newRefreshToken, cookieConfig);
      currentUser.refreshToken = newRefreshToken;
      await currentUser.save();

      return {
        errCode: 0,
        msg: 'Ok',
        data: newAccessToken,
      };
    } catch (error) {
      if (error.response) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Something wrong with server ! ' + error,
      );
    }
  }

  async changePassword(data: changePasswordDto, id: string): Promise<response> {
    try {
      const currentUser = await this.UserModel.findOne({ where: { id } });
      if (!currentUser) {
        throw new BadRequestException();
      }
      const isMatch = await argon2.verify(currentUser.password, data.password);
      if (!isMatch) {
        return {
          errCode: 1,
          msg: 'Password is not correct !',
        };
      }
      currentUser.password = await argon2.hash(data.newPassword);
      await currentUser.save();
      return {
        errCode: 0,
        msg: 'Ok',
      };
    } catch (error) {
      if (error.response) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Something wrong with server ! ' + error,
      );
    }
  }
}
