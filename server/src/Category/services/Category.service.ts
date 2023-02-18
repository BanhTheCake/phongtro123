import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { Category } from './../../Models/Entity/categories.model';
import { Injectable, Inject } from '@nestjs/common';
import { response } from 'utils/types/response.type';

@Injectable()
export class CategoryService {
  constructor(@Inject('CATEGORY') private CategoryModel: typeof Category) {}

  async getAllSlugs(): Promise<response> {
    try {
      const categories = await this.CategoryModel.findAll({
        attributes: ['id', 'code', 'slug', 'value'],
      });
      return {
        errCode: 0,
        msg: 'Ok',
        data: categories,
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
