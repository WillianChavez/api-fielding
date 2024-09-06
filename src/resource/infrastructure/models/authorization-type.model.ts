import { UUID } from '@shared-decorators';
import {
  PrimaryKey,
  Column,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Model,
  Table,
  HasMany,
} from 'sequelize-typescript';
import AuthorizationModel from './authorization.model';

@Table({
  tableName: 'ctl_authorization_type',
  underscored: true,
  paranoid: true,
  timestamps: true,
})
export default class AuthorizationTypeModel extends Model {
  @PrimaryKey
  @UUID
  id: string;

  @Column
  name: string;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;

  @HasMany(() => AuthorizationModel)
  authorizations: AuthorizationModel[];
}
