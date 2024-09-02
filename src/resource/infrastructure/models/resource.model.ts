import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { UUID } from '@shared-decorators';
import ResourceTypeModel from './resource-type.model';
import WorkspaceModel from '@/workspace/infrastructure/models/workspace.model';
@Table({
  tableName: 'mnt_resource',
  underscored: true,
  paranoid: true,
  timestamps: true,
})
export default class ResourceModel extends Model<ResourceModel> {
  @PrimaryKey
  @UUID
  id: string;

  @Default(1)
  @AllowNull
  @Column(DataType.INTEGER)
  order: number;

  @Column
  name: string;

  @AllowNull
  @Column
  description: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;

  @ForeignKey(() => ResourceTypeModel)
  @UUID
  resourceTypeId: string;

  @BelongsTo(() => ResourceTypeModel)
  resourceType: ResourceTypeModel;

  @AllowNull
  @ForeignKey(() => ResourceModel)
  @UUID
  parentResourceId: string;

  @BelongsTo(() => ResourceModel)
  parentResource: ResourceModel;

  @HasMany(() => ResourceModel)
  children: ResourceModel[];

  @ForeignKey(() => WorkspaceModel)
  @UUID
  workspaceId: number;

  @BelongsTo(() => WorkspaceModel)
  workspace: WorkspaceModel;
}
