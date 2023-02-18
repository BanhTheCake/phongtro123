import { Province } from 'Models/Entity/province.model';
import { Category } from './categories.model';
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Attribute } from './attributes.model';
import { Image } from './images.model';
import { User } from './users.model';
import { Overview } from './overviews.model';
import { Label } from './labels.model';

@Table({
  tableName: 'posts',
  timestamps: true,
  freezeTableName: true,
})
export class Post extends Model<Post> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  id: string;

  @Column({
    type: DataType.TEXT('medium'),
  })
  title: string;

  @Column({
    type: DataType.STRING,
  })
  star: string;

  @Column({
    type: DataType.STRING,
  })
  labelCode: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.STRING,
  })
  attributesId: string;

  @BelongsTo(() => Attribute, {
    foreignKey: 'attributesId',
    targetKey: 'id',
  })
  attributes: Attribute;

  @Column({
    type: DataType.STRING,
  })
  categoryCode: string;

  @BelongsTo(() => Category, {
    targetKey: 'code',
    foreignKey: 'categoryCode',
  })
  category: Category;

  @Column({
    type: DataType.STRING,
  })
  provinceCode: string;

  @BelongsTo(() => Province, {
    targetKey: 'code',
    foreignKey: 'provinceCode',
  })
  province: Province;

  @Column({
    type: DataType.TEXT('long'),
  })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  userId: string;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
    targetKey: 'id',
  })
  user: User;

  @Column({
    type: DataType.STRING,
  })
  overviewId: string;

  @BelongsTo(() => Overview, {
    foreignKey: 'overviewId',
    targetKey: 'id',
  })
  overview: Overview;

  @Column({
    type: DataType.STRING,
  })
  imagesId: string;

  @BelongsTo(() => Image, {
    foreignKey: 'imagesId',
    targetKey: 'id',
  })
  images: Image;

  @BelongsTo(() => Label, {
    foreignKey: 'labelCode',
    targetKey: 'code',
  })
  label: Label;
}
