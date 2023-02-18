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
  tableName: 'attributes',
  timestamps: true,
  freezeTableName: true,
})
export class Attribute extends Model<Attribute> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  id: string;

  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
  })
  acreage: number;

  @Column({
    type: DataType.STRING,
  })
  published: string;

  @Column({
    type: DataType.STRING,
  })
  hashtag: string;

  @HasOne(() => Post, {
    foreignKey: 'attributesId',
    sourceKey: 'id',
  })
  post: Post;
}
