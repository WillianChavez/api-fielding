// tabla polimorfica

import { UUID } from '@shared-decorators';
import {
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export class RequestModel extends Model<RequestModel> {
  @PrimaryKey
  @UUID
  id: string;

  @UUID
  resourceId: string;

  @UUID
  requestableId: string;

  @Column
  requestableType: string;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;
}
