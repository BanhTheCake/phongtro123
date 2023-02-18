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
  tableName: 'overviews',
  timestamps: true,
  freezeTableName: true,
})
export class Overview extends Model<Overview> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  code: string;

  @Column({
    type: DataType.STRING,
  })
  area: string;

  @Column({
    type: DataType.STRING,
  })
  type: string;

  @Column({
    type: DataType.STRING,
  })
  target: string;

  @Column({
    type: DataType.DATE,
  })
  expire: Date;

  @Column({
    type: DataType.STRING,
  })
  bonus: string;

  @HasOne(() => Post, {
    foreignKey: 'overviewId',
    sourceKey: 'id',
  })
  post: Post;
}
