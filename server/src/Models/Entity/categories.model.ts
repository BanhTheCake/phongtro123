import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript';
import { Post } from './posts.model';

@Table({
  tableName: 'categories',
  timestamps: true,
  freezeTableName: true,
})
export class Category extends Model<Category> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  code: string;

  @Column({
    type: DataType.STRING,
  })
  value: string;

  @Column({
    type: DataType.STRING,
  })
  slug: string;

  @Column({
    type: DataType.TEXT('medium'),
  })
  header: string;

  @Column({
    type: DataType.TEXT('medium'),
  })
  subheader: string;

  @HasMany(() => Post, {
    foreignKey: 'categoryCode',
    sourceKey: 'code',
  })
  posts: [Post];
}
