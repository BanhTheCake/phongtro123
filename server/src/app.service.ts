import { Inject, Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { Attribute } from './Models/Entity/attributes.model';
import { Image } from './Models/Entity/images.model';
import { Label } from './Models/Entity/labels.model';
import { Overview } from './Models/Entity/overviews.model';
import { Post } from './Models/Entity/posts.model';
import { User } from './Models/Entity/users.model';
import { generateCode } from './utils/helper';

import formatPriceToNumber from './utils/helpers/formatPriceToNumber';
import * as dataJson from './insertData/chothuecanho.json';
import * as CTCH from './insertData/chothuecanho.json';
import * as CTMB from './insertData/chothuematbang.json';
import * as CTPT from './insertData/chothuephongtro.json';
import * as NCT from './insertData/nhachothue.json';
import { Province } from './Models/Entity/province.model';

const datas = [
  { content: CTCH.content, code: 'CTCH' },
  { content: CTMB.content, code: 'CTMB' },
  { content: CTPT.content, code: 'CTPT' },
  { content: NCT.content, code: 'NCT' },
];

type UNI = (typeof CTCH)['content'];

@Injectable()
export class AppService {
  constructor(
    @Inject('USER') private UserModel: typeof User,
    @Inject('POST') private PostModel: typeof Post,
    @Inject('ATTRIBUTE') private AttrModel: typeof Attribute,
    @Inject('IMAGE') private ImageModel: typeof Image,
    @Inject('LABEL') private LabelModel: typeof Label,
    @Inject('OVERVIEW') private OverviewModel: typeof Overview,
    @Inject('PROVINCE') private ProvinceModel: typeof Province,
  ) {}

  async insertData() {
    try {
      const data = dataJson.content;
      datas.forEach(
        async <T extends { content: UNI; code: string }>(file: T) => {
          const data = file.content;
          for (const item of data) {
            const postId = uuidv4();
            const labelCode = generateCode(4);
            const attrId = uuidv4();
            const userId = uuidv4();
            const overviewId = uuidv4();
            const imageId = uuidv4();
            const provinceCode = generateCode(4);
            const currentLabel = await this.LabelModel.findOrCreate({
              where: { value: item?.class },
              defaults: {
                code: labelCode,
                value: item?.class,
              },
              raw: true,
            });

            const currentProvince = await this.ProvinceModel.findOrCreate({
              where: { value: item.address.split(',').pop().trim() },
              defaults: {
                code: provinceCode,
                value: item.address.split(',').pop().trim(),
              },
              raw: true,
            });

            let labelInput = labelCode;
            let provinceInput = provinceCode;

            if (!currentLabel[1]) {
              labelInput = currentLabel[0].code;
            }

            if (!currentProvince[1]) {
              provinceInput = currentProvince[0].code;
            }

            await this.PostModel.create({
              id: postId,
              title: item?.title,
              star: file.code === 'NCT' ? '0' : item?.star,
              labelCode: labelInput,
              provinceCode: provinceInput,
              address: item?.address,
              attributesId: attrId,
              categoryCode: file.code,
              description: JSON.stringify(item?.description),
              userId: userId,
              overviewId: overviewId,
              imagesId: imageId,
            });

            await this.AttrModel.create({
              id: attrId,
              price: formatPriceToNumber(item?.attr?.price),
              acreage: parseInt(item?.attr?.acreage.split('m')[0]),
              published: item?.attr?.published,
              hashtag: item?.attr?.hashtag,
            });

            await this.ImageModel.create({
              id: imageId,
              images: JSON.stringify(item?.img),
            });

            await this.UserModel.create({
              id: userId,
              name: item?.info.find((data) => data.name === 'Liên hệ:').value,
              password: await argon2.hash('123456'),
              phone: item?.info.find((data) => data.name === 'Điện thoại:')
                .value,
              zalo: item?.info.find((data) => data.name === 'Zalo').value,
            });

            await this.OverviewModel.create({
              id: overviewId,
              code: item?.features.find((data) => data.name === 'Mã tin:')
                .value,
              area: item?.features.find((data) => data.name === 'Khu vực')
                .value,
              type: item?.features.find((data) => data.name === 'Loại tin rao:')
                .value,
              target: item?.features.find(
                (data) => data.name === 'Đối tượng thuê:',
              ).value,
              bonus: item?.features.find((data) => data.name === 'Gói tin:')
                .value,
              expire: new Date(),
              createdAt: new Date(),
            });
          }
        },
      );
      return 'Done';
    } catch (error) {
      throw new InternalServerErrorException('Something wrong ' + error);
    }
  }
}
