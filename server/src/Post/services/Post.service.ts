import { response } from './../../utils/types/response.type';
import { AccessToken } from 'Auth/types/token.type';
import { Category } from './../../Models/Entity/categories.model';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { Injectable, Inject } from '@nestjs/common';
import { Post } from 'Models/Entity/posts.model';
import { Image } from 'Models/Entity/images.model';
import { User } from 'Models/Entity/users.model';
import { Attribute } from 'Models/Entity/attributes.model';
import { allPostsPagination } from '../dto/allPostsPagination.dto';
import pagination from 'utils/helpers/pagination';
import { Op } from 'sequelize';
import { getNewPostsDto } from '../dto/getNewPosts.dto';
import { createNewPostDto } from '../dto/createNewPost.dto';
import { v4 as uuidv4 } from 'uuid';
import { generateCodeNumber, generateCode } from 'utils/helper';
import { Label } from 'Models/Entity/labels.model';
import { Overview } from 'Models/Entity/overviews.model';
import { Province } from 'Models/Entity/province.model';
import { updatePostDto } from 'Post/dto/updatePost.dto';
import { getOwnerPosts } from 'Post/dto/getOwnerPosts';

@Injectable()
export class PostService {
  constructor(
    @Inject('POST') private PostModel: typeof Post,
    @Inject('ATTRIBUTE') private AttrModel: typeof Attribute,
    @Inject('IMAGE') private ImageModel: typeof Image,
    @Inject('LABEL') private LabelModel: typeof Label,
    @Inject('OVERVIEW') private OverviewModel: typeof Overview,
    @Inject('PROVINCE') private ProvinceModel: typeof Province,
  ) {}

  async getAllPosts(): Promise<response> {
    try {
      const posts = await this.PostModel.findAll({
        where: { categoryCode: 'CTCH' },
        attributes: ['id', 'title', 'star', 'address', 'description'],
        include: [
          { model: Image, attributes: ['images'] },
          { model: User, attributes: ['name', 'id', 'phone', 'zalo', 'image'] },
          {
            model: Attribute,
            attributes: ['id', 'price', 'acreage', 'published', 'hashtag'],
          },
        ],
        order: [['star', 'DESC']],
      });
      return {
        errCode: 0,
        msg: 'Ok',
        data: posts,
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

  async getAllPostsPagination({
    limit,
    page,
    order,
    ...queries
  }: allPostsPagination): Promise<response> {
    try {
      const offset = (page - 1) * limit;
      // This constant is generated by mapping `queryKeys` array and filtering only keys that contain either 'Price' or 'Area'
      // For each filtered key, determine the key for attribute model ('price' or 'area')
      // And determine the value for the where clause, either greater than or equal to `queries[query]` (if key contains 'min') or less than `queries[query]` (otherwise)
      const queryKeys = Object.keys(queries);
      const attrWhereCondition = queryKeys
        .filter((query) => query.includes('Price') || query.includes('Area'))
        .map((query) => {
          const key = query.includes('Price') ? 'price' : 'acreage';
          const value = query.includes('min')
            ? { [Op.gte]: queries[query] }
            : { [Op.lt]: queries[query] };
          return { [key]: value };
        });

      const categoryWhereCondition = queries.category
        ? { slug: queries.category }
        : {};

      const postWhereCondition = queries.province
        ? { provinceCode: queries.province }
        : {};

      const { count, rows: posts } = await this.PostModel.findAndCountAll({
        where: postWhereCondition,
        attributes: ['id', 'title', 'star', 'address', 'description'],
        include: [
          { model: Image, attributes: ['images'] },
          { model: User, attributes: ['name', 'id', 'phone', 'zalo', 'image'] },
          {
            model: Attribute,
            attributes: ['id', 'price', 'acreage', 'published', 'hashtag'],
            where: {
              [Op.and]: attrWhereCondition,
            },
          },
          { model: Category, attributes: [], where: categoryWhereCondition },
        ],
        order: [[order, 'DESC']],
        offset,
        limit,
      });

      return {
        errCode: 0,
        msg: 'Ok',
        data: {
          data: posts,
          pagination: pagination({ count, limit, page }),
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

  async getNewPosts({ limit }: getNewPostsDto): Promise<response> {
    try {
      const newPosts = await this.PostModel.findAll({
        attributes: ['id', 'title', 'createdAt'],
        limit,
        order: [['createdAt', 'DESC']],
        include: [
          { model: Image, attributes: ['images'] },
          {
            model: Attribute,
            attributes: ['price'],
          },
        ],
      });
      return {
        errCode: 0,
        msg: 'Ok',
        data: newPosts,
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

  async createNewPost(
    data: createNewPostDto,
    user: AccessToken,
  ): Promise<response> {
    try {
      const attrPromise = this.AttrModel.create({
        id: uuidv4(),
        price: data.price,
        acreage: data.area,
        published: '',
        hashtag: generateCodeNumber(6),
      });

      const imagePromise = this.ImageModel.create({
        id: uuidv4(),
        images: JSON.stringify(data.images),
      });

      const labelPromise = await this.LabelModel.findOrCreate({
        where: { value: data.label },
        defaults: {
          code: generateCode(4),
          value: data.label,
        },
      });

      const currentDate = new Date();

      const overviewPromise = this.OverviewModel.create({
        id: uuidv4(),
        code: ['#', generateCodeNumber(6)].join(''),
        area: data.label,
        type: data.type,
        target: data.gender,
        expire: new Date(currentDate.setDate(currentDate.getDate() + 10)),
      });

      const provincePromise = this.ProvinceModel.findOrCreate({
        where: { value: data.province },
        defaults: {
          code: generateCode(4),
          value: data.province,
        },
      });

      const currentData = await Promise.allSettled([
        attrPromise,
        imagePromise,
        labelPromise,
        overviewPromise,
        provincePromise,
      ]);

      const [
        attrEntity,
        imageEntity,
        labelEntity,
        overviewEntity,
        provinceEntity,
      ] = currentData.map((item) => {
        if (item.status === 'rejected') {
          throw new Error(item.reason);
        }
        if (Array.isArray(item.value)) {
          return item.value[0];
        }
        return item.value;
      }) as [Attribute, Image, Label, Overview, Province];

      await this.PostModel.create({
        id: uuidv4(),
        title: data.title,
        star: '0',
        labelCode: labelEntity.code,
        address: data.address,
        attributesId: attrEntity.id,
        categoryCode: data.category,
        provinceCode: provinceEntity.code,
        description: JSON.stringify([data.description]),
        userId: user.id,
        overviewId: overviewEntity.id,
        imagesId: imageEntity.id,
      });

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

  async getOwnerPosts(
    id: string,
    status: getOwnerPosts['status'],
  ): Promise<response> {
    try {
      const statusCondition: { [key in typeof status]: any } = {
        all: {},
        expire: {
          expire: { [Op.lt]: new Date() },
        },
        public: {
          expire: { [Op.gte]: new Date() },
        },
      };
      const overviewWhereCondition = statusCondition[status];

      const allPosts = await this.PostModel.findAll({
        where: { userId: id },
        include: [
          { model: Attribute, attributes: ['price'] },
          {
            model: Overview,
            attributes: ['code', 'expire'],
            where: overviewWhereCondition,
          },
        ],
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'title', 'createdAt'],
      });
      return {
        errCode: 0,
        msg: 'Ok',
        data: allPosts,
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

  async getCurrentPost(id: string): Promise<response> {
    try {
      const currentPost = await this.PostModel.findOne({
        where: { id },
        include: [
          { model: Overview, attributes: ['area', 'target', 'type'] },
          { model: Attribute, attributes: ['price', 'acreage'] },
          { model: Image, attributes: ['images'] },
        ],
        attributes: ['id', 'title', 'description', 'categoryCode'],
      });
      if (!currentPost) {
        return {
          errCode: 1,
          msg: 'Post is not exist in out system !',
        };
      }
      return {
        errCode: 0,
        msg: 'Ok',
        data: currentPost,
      };
    } catch (error) {
      if (error.response) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Something wrong with server !' + error,
      );
    }
  }

  async getDetailsPost(id: string): Promise<response> {
    try {
      const currentPost = await this.PostModel.findOne({
        where: { id },
        include: [
          {
            model: Overview,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
          {
            model: Attribute,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
          { model: Image, attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Label, attributes: { exclude: ['createdAt', 'updatedAt'] } },
          {
            model: Category,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
          {
            model: Province,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
          {
            model: User,
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'password', 'refreshToken'],
            },
          },
        ],
        attributes: {
          exclude: [
            'labelCode',
            'attributesId',
            'categoryCode',
            'provinceCode',
            'overviewId',
            'imagesId',
            'userId',
          ],
        },
      });
      if (!currentPost) {
        return {
          errCode: 1,
          msg: 'Post is not exist in out system !',
        };
      }
      return {
        errCode: 0,
        msg: 'Ok',
        data: currentPost,
      };
    } catch (error) {
      if (error.response) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Something wrong with server !' + error,
      );
    }
  }

  async handleUpdatePost(
    data: updatePostDto,
    postId: string,
  ): Promise<response> {
    try {
      const promises = [];
      if (data?.label) {
        const labelPromise = await this.LabelModel.findOrCreate({
          where: { value: data.label },
          defaults: {
            code: generateCode(4),
            value: data.label,
          },
        });
        promises.push(labelPromise);
      }
      if (data?.province) {
        const provincePromise = this.ProvinceModel.findOrCreate({
          where: { value: data.province },
          defaults: {
            code: generateCode(4),
            value: data.province,
          },
        });
        promises.push(provincePromise);
      }

      const [labelData, provinceData] = (await Promise.all(promises)).map(
        (item) => {
          if (Array.isArray(item)) {
            return item[0];
          }
          return item;
        },
      ) as [Label, Province];

      const valueUpdatePost: Partial<Post> = {};

      if (labelData) valueUpdatePost.labelCode = labelData.code;
      if (provinceData) valueUpdatePost.provinceCode = provinceData.code;
      Object.keys(data)
        .filter((key) =>
          ['title', 'description', 'category', 'address'].includes(key),
        )
        .forEach((key) => {
          if (key === 'category') {
            valueUpdatePost['categoryCode'] = data[key];
            return;
          }
          valueUpdatePost[key] = data[key];
        });

      await this.PostModel.update(valueUpdatePost, {
        where: { id: postId },
      });

      const currentPost = await this.PostModel.findOne({
        where: { id: postId },
      });

      const valueUpdateOverview: Partial<Overview> = {};
      const valueUpdateImage: Partial<Image> = {};
      const valueUpdateAttr: Partial<Attribute> = {};

      Object.keys(data)
        .filter((key) => ['label', 'gender', 'type'].includes(key))
        .forEach((key) => {
          if (key === 'label') {
            valueUpdateOverview['area'] = data[key];
            return;
          }
          if (key === 'gender') {
            valueUpdateOverview['target'] = data[key];
            return;
          }
          valueUpdateOverview[key] = data[key];
        });

      Object.keys(data)
        .filter((key) => ['price', 'area'].includes(key))
        .forEach((key) => {
          if (key === 'area') {
            valueUpdateAttr['acreage'] = data[key];
            return;
          }
          valueUpdateAttr[key] = data[key];
        });

      Object.keys(data)
        .filter((key) => ['images'].includes(key))
        .forEach((key) => {
          valueUpdateImage[key] = data[key];
        });

      await Promise.all([
        this.OverviewModel.update(valueUpdateOverview, {
          where: { id: currentPost.overviewId },
        }),
        this.AttrModel.update(valueUpdateAttr, {
          where: { id: currentPost.attributesId },
        }),
        this.ImageModel.update(valueUpdateImage, {
          where: { id: currentPost.imagesId },
        }),
      ]);

      return {
        errCode: 0,
        msg: 'Ok',
      };
    } catch (error) {
      if (error.response) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Something wrong with server !' + error,
      );
    }
  }

  async deletePostById(id: string): Promise<response> {
    try {
      const post = await this.PostModel.findOne({ where: { id } });
      if (!post) {
        return {
          errCode: 0,
          msg: 'Ok',
        };
      }
      await Promise.all([
        this.AttrModel.destroy({ where: { id: post.attributesId } }),
        this.ImageModel.destroy({ where: { id: post.imagesId } }),
        this.OverviewModel.destroy({ where: { id: post.overviewId } }),
        this.PostModel.destroy({ where: { id } }),
      ]);
      return {
        errCode: 0,
        msg: 'Ok',
      };
    } catch (error) {
      if (error.response) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Something wrong with server !' + error,
      );
    }
  }
}
