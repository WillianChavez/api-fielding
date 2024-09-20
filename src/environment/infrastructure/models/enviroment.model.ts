import ResourceModel from '@/resource/infrastructure/models/resource.model';
import { UUID } from '@shared-decorators';
import {
  BelongsToMany,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import CollaboratorModel from '@/workspace/infrastructure/models/collaborator.model';
import EnvironmentVariableModel from './environment.variable.model';
import EnvironmentResourceModel from './environment.resource.model';
import EnvironmentCollaboratorModel from './environment.collaborator.model';

@Table({
  tableName: 'mnt_environment',
  underscored: true,
  paranoid: true,
  timestamps: true,
})
export default class EnvironmentModel extends Model<EnvironmentModel> {
  @PrimaryKey
  @UUID
  id: string;

  @Column
  name: string;

  @BelongsToMany(() => ResourceModel, () => EnvironmentResourceModel)
  resources: ResourceModel[];

  @BelongsToMany(() => CollaboratorModel, () => EnvironmentCollaboratorModel)
  collaborators: CollaboratorModel[];

  @HasMany(() => EnvironmentVariableModel)
  variables: EnvironmentVariableModel[];
}
