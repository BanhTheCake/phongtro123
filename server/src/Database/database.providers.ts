import { Overview } from './../Models/Entity/overviews.model';
import { Category } from './../Models/Entity/categories.model';
import { Attribute } from './../Models/Entity/attributes.model';
import { Label } from './../Models/Entity/labels.model';
import { Post } from './../Models/Entity/posts.model';
import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { Image } from './../Models/Entity/images.model';
import { Price } from 'Models/Entity/price.model';
import { Area } from 'Models/Entity/area.model';
import { User } from 'Models/Entity/users.model';
import { Province } from 'Models/Entity/province.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case 'development':
          config = databaseConfig.development;
          break;
        case 'test':
          config = databaseConfig.test;
          break;
        case 'production':
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([
        User,
        Post,
        Label,
        Attribute,
        Category,
        Overview,
        Image,
        Price,
        Area,
        Province,
      ]);
      // await sequelize.sync({ force: true });
      await sequelize.sync();
      return sequelize;
    },
  },
];
