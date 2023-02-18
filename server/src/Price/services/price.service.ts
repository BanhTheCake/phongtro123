import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { Injectable, Inject } from '@nestjs/common';
import { Price } from 'Models/Entity/price.model';
import { response } from 'utils/types/response.type';
@Injectable()
export class PriceService {
  constructor(@Inject('PRICE') private PriceModel: typeof Price) {}

  getHello() {
    return 'i am price services';
  }

  async getAllPrice(): Promise<response> {
    try {
      const prices = await this.PriceModel.findAll({
        attributes: ['fromValue', 'toValue', 'value'],
      });
      return {
        errCode: 0,
        msg: 'Ok',
        data: prices,
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
