import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { Injectable, Inject } from '@nestjs/common';
import { Area } from 'Models/Entity/area.model';
import { response } from 'utils/types/response.type';
@Injectable()
export class AreaService {
  constructor(@Inject('AREA') private AreaModel: typeof Area) {}

  getHello() {
    return 'i am area service';
  }

  async getAllAreas(): Promise<response> {
    try {
      const areas = await this.AreaModel.findAll({
        attributes: ['fromValue', 'toValue', 'value'],
      });
      return {
        errCode: 0,
        msg: 'Ok',
        data: areas,
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
