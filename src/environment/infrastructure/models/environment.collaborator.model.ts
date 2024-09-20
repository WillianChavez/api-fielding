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
import CollaboratorModel from '@/workspace/infrastructure/models/collaborator.model';

@Table({
  tableName: 'mnt_environment_user',
  underscored: true,
  paranoid: true,
  timestamps: true,
})
export default class EnvironmentCollaboratorModel extends Model<EnvironmentCollaboratorModel> {
  @PrimaryKey
  @UUID
  id: string;

  @UUID
  @ForeignKey(() => CollaboratorModel)
  collaboratorId: string;

  @UUID
  @ForeignKey(() => EnvironmentModel)
  environmentId: string;

  @BelongsTo(() => EnvironmentModel)
  environment: EnvironmentModel;

  @BelongsTo(() => CollaboratorModel)
  collaborator: CollaboratorModel;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;
}
