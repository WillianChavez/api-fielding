import {
  PrimaryKey,
  Column,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Model,
  AllowNull,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import HttpRequestModel from './http-request.model';
import { UUID } from '@shared-decorators';

@Table({
  tableName: 'mnt_body',
  underscored: true,
  timestamps: true,
  paranoid: true,
})
export default class BodyModel extends Model<BodyModel> {
  @PrimaryKey
  @UUID
  id: string;

  @Column
  name: string;

  @AllowNull(true)
  @Column
  value: string;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;

  @ForeignKey(() => HttpRequestModel)
  @UUID
  httpRequestId: string;

  @BelongsTo(() => HttpRequestModel)
  httpRequest: HttpRequestModel;
}
