import {
  BelongsTo,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { UUID } from '@shared-decorators';
import HttpRequestModel from './http-request.model';

@Table({
  tableName: 'mnt_parameter',
  underscored: true,
  timestamps: true,
  paranoid: true,
})
export default class ParameterModel extends Model<ParameterModel> {
  @PrimaryKey
  @UUID
  id: string;

  @Column
  name: string;

  @Column
  value: string;

  @Column
  isQueryParameter: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;

  @UUID
  @ForeignKey(() => HttpRequestModel)
  httpRequestId: string;

  @BelongsTo(() => HttpRequestModel)
  httpRequest: HttpRequestModel;
}
