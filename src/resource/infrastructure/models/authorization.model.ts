import {
  PrimaryKey,
  Column,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Model,
  HasMany,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import HttpRequestModel from './http-request.model';
import { UUID } from '@shared-decorators';
import AuthorizationTypeModel from './authorization-type.model';
import ExtraOptionsModel from './extra-options.model';

@Table({
  tableName: 'mnt_authorization',
  underscored: true,
  timestamps: true,
  paranoid: true,
})
export default class AuthorizationModel extends Model<AuthorizationModel> {
  @PrimaryKey
  @UUID
  id: string;

  @Column
  description: string;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;

  @HasMany(() => ExtraOptionsModel)
  extraOptions: ExtraOptionsModel[];

  @ForeignKey(() => HttpRequestModel)
  @UUID
  httpRequestId: string;

  @BelongsTo(() => HttpRequestModel)
  httpRequest: HttpRequestModel;

  @ForeignKey(() => AuthorizationTypeModel)
  @UUID
  authorizationTypeId: string;

  @BelongsTo(() => AuthorizationTypeModel)
  authorizationType: AuthorizationTypeModel;
}
