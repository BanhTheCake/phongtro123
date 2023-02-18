import { Post } from 'Models/Entity/posts.model';
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  HasOne,
} from 'sequelize-typescript';

@Table({
  tableName: 'labels',
  timestamps: true,
  freezeTableName: true,
})
export class Label extends Model<Label> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  code: string;

  @HasOne(() => Post, {
    foreignKey: 'labelCode',
    sourceKey: 'code',
  })
  post: Post;

  @Column({
    type: DataType.STRING,
  })
  value: string;
}
