/* eslint-disable prettier/prettier */
import {
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'mnt_user', underscored: true })
export default class UserModel extends Model<UserModel> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;

  @Column({ type: DataType.STRING, allowNull: true })
  urlPhoto: string;
}
