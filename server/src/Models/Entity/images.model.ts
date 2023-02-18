import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  HasOne,
} from 'sequelize-typescript';
import { Post } from './posts.model';

@Table({
  tableName: 'images',
  timestamps: true,
  freezeTableName: true,
})
export class Image extends Model<Image> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  id: string;

  @Column({
    type: DataType.TEXT('long'),
  })
  images: string;

  @HasOne(() => Post, {
    foreignKey: 'imagesId',
    sourceKey: 'id',
  })
  post: Post;
}
