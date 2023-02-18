import { updateDataUserDto } from './../dto/updateDataUser.dto';
import { AccessToken } from './../../Auth/types/token.type';
import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { Injectable, Inject } from '@nestjs/common';
import { User } from 'Models/Entity/users.model';
import { response } from 'utils/types/response.type';

@Injectable()
export class UserService {
  constructor(@Inject('USER') private UserModel: typeof User) {}

  getHello() {
    return 'i am user service !';
  }

  async getDataCurrentUser(user: AccessToken): Promise<response> {
    try {
      const currentUser = await this.UserModel.findOne({
        where: { id: user.id, name: user.name },
        attributes: { exclude: ['password', 'refreshToken'] },
      });
      if (!currentUser) {
        throw new UnauthorizedException();
      }
      return {
        errCode: 0,
        msg: 'Ok',
        data: currentUser,
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

  async updateDataUser(id: string, data: updateDataUserDto): Promise<response> {
    try {
      await this.UserModel.update(data, { where: { id } });
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
