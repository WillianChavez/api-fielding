import {
  PrimaryKey,
  Column,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import HttpRequestModel from './http-request.model';
import { UUID } from '@shared-decorators';

@Table({
  tableName: 'mnt_header',
  underscored: true,
  timestamps: true,
  paranoid: true,
})
export default class HeaderModel extends Model<HeaderModel> {
  @PrimaryKey
  @UUID
  id: string;

  @Column
  name: string;

  @Column
  value: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;

  @ForeignKey(() => HttpRequestModel)
  @UUID
  httpRequestId: string;

  @BelongsTo(() => HttpRequestModel, 'httpRequestId')
  httpRequest: HttpRequestModel;
}
