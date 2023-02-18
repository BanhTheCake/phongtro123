import { Post } from 'Models/Entity/posts.model';
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript';

@Table({
  tableName: 'Provinces',
  timestamps: true,
  freezeTableName: true,
})
export class Province extends Model<Province> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  code: string;

  @Column({
    type: DataType.STRING,
  })
  value: string;

  @HasMany(() => Post, {
    foreignKey: 'provinceCode',
    sourceKey: 'code',
  })
  posts: [Post];
}
