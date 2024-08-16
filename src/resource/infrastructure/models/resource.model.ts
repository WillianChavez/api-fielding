import { UUID } from '@shared-decorators';
import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'mnt_resource',
  underscored: true,
  paranoid: true,
  timestamps: true,
})
export class ResourceModel extends Model<ResourceModel> {
  @PrimaryKey
  @UUID
  id: string;

  @Default(1)
  @AllowNull
  @Column(DataType.INTEGER)
  order: number;

  @Column
  name: string;

  @AllowNull
  @Column
  description: string;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;
}
