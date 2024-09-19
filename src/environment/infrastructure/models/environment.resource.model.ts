import { UUID } from '@shared-decorators';
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
import EnvironmentModel from './enviroment.model';
import ResourceModel from '@/resource/infrastructure/models/resource.model';

@Table({
  tableName: 'mnt_environment_resource',
  underscored: true,
  paranoid: true,
  timestamps: true,
})
export default class EnvironmentResourceModel extends Model<EnvironmentResourceModel> {
  @PrimaryKey
  @UUID
  id: string;

  @ForeignKey(() => EnvironmentModel)
  @UUID
  environmentId: string;

  @ForeignKey(() => ResourceModel)
  @UUID
  resourceId: string;

  @BelongsTo(() => EnvironmentModel)
  environment: EnvironmentModel;

  @BelongsTo(() => ResourceModel)
  resource: ResourceModel;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;
}
