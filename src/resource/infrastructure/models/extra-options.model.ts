import { UUID } from '@shared-decorators';
import {
  PrimaryKey,
  Column,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Model,
  ForeignKey,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import AuthorizationModel from './authorization.model';

@Table({
  tableName: 'mnt_extra_options',
  underscored: true,
  timestamps: true,
  paranoid: true,
})
export default class ExtraOptionsModel extends Model<ExtraOptionsModel> {
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

  @ForeignKey(() => AuthorizationModel)
  @UUID
  authorizationId: string;

  @BelongsTo(() => AuthorizationModel, 'authorizationId')
  authorization: AuthorizationModel;
}
