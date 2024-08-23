import {
  Column,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { UUID } from '@shared-decorators';
import ResourceModel from './resource.model';
@Table({
  tableName: 'ctl_resource_type',
  underscored: true,
  paranoid: true,
  timestamps: true,
})
export default class ResourceTypeModel extends Model<ResourceTypeModel> {
  @PrimaryKey
  @UUID
  id: string;

  @Column
  name: string;

  @DeletedAt
  deletedAt?: Date;

  @HasMany(() => ResourceModel)
  resources: ResourceModel[];
}
