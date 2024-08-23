import {
  BelongsTo,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { UUID } from '@shared-decorators';
import MethodModel from './method.model';
import HeaderModel from './header.model';
import BodyModel from './body.model';
import ParameterModel from './parameter.model';
import AuthorizationModel from './authorization.model';
import RequestModel from './request.model';
@Table({
  tableName: 'mnt_http_request',
  underscored: true,
  paranoid: true,
  timestamps: true,
})
export default class HttpRequestModel extends Model<HttpRequestModel> {
  @PrimaryKey
  @UUID
  id: string;

  @Column
  url: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;

  @ForeignKey(() => MethodModel)
  @UUID
  methodId: string;

  @BelongsTo(() => MethodModel)
  method: MethodModel;

  @HasMany(() => HeaderModel)
  headers: HeaderModel[];

  @HasMany(() => BodyModel)
  bodies: BodyModel[];

  @HasMany(() => ParameterModel)
  parameters: ParameterModel[];

  @HasMany(() => AuthorizationModel)
  authorizations: AuthorizationModel[];

  @HasOne(() => RequestModel)
  request: RequestModel;
}
