import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({
  tableName: 'Areas',
  timestamps: true,
  freezeTableName: true,
})
export class Area extends Model<Area> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
  })
  fromValue: number;

  @Column({
    type: DataType.INTEGER,
  })
  toValue: number;

  @Column({
    type: DataType.STRING,
  })
  value: string;
}
