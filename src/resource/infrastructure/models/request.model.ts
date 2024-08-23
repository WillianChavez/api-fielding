import {
  BelongsTo,
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
import ResourceModel from './resource.model';

@Table({
  tableName: 'mnt_request',
  underscored: true,
  timestamps: true,
  paranoid: true,
})
export default class RequestModel extends Model<RequestModel> {
  @PrimaryKey
  @UUID
  id: string;

  @UUID
  @ForeignKey(() => ResourceModel)
  resourceId: string;

  @BelongsTo(() => ResourceModel)
  resource: ResourceModel;

  @UUID
  @ForeignKey(() => HttpRequestModel)
  httpRequestId: string;

  @BelongsTo(() => HttpRequestModel)
  httpRequest: HttpRequestModel;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;
}