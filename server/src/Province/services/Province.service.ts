import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { Injectable, Inject } from '@nestjs/common';
import { Province } from 'Models/Entity/province.model';
import { response } from 'utils/types/response.type';
@Injectable()
export class ProvinceService {
  constructor(@Inject('PROVINCE') private ProvinceModel: typeof Province) {}

  async getHello() {
    return 'I am province service !';
  }

  async getAllProvinces(): Promise<response> {
    try {
      const provinces = await this.ProvinceModel.findAll({
        attributes: ['code', 'value'],
      });
      return {
        errCode: 0,
        msg: 'Ok',
        data: provinces,
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
