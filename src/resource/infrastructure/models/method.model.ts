import {
  Column,
  CreatedAt,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { UUID } from '@shared-decorators';
import HttpRequestModel from './http-request.model';

@Table({
  tableName: 'ctl_method',
  underscored: true,
  paranoid: true,
  timestamps: true,
  modelName: 'MethodModel',
})
export default class MethodModel extends Model {
  @PrimaryKey
  @UUID
  id: string;

  @Column
  name: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;

  @HasMany(() => HttpRequestModel)
  httpRequests: HttpRequestModel[];
}
