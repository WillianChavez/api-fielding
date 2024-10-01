import { UUID } from '@shared-decorators';
import {
  BelongsTo,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import EnvironmentModel from './enviroment.model';

@Table({
  tableName: 'mnt_environment_variable',
  underscored: true,
  paranoid: true,
  timestamps: true,
})
export default class EnvironmentVariableModel extends Model<EnvironmentVariableModel> {
  @PrimaryKey
  @UUID
  id: string;

  @Column
  name: string;

  @Column
  initial_value?: string;

  @Column
  current_value?: string;

  @Column
  global_value?: string;

  @Column({ defaultValue: true })
  active?: boolean;

  @ForeignKey(() => EnvironmentModel)
  @UUID
  environment_id: string;

  @BelongsTo(() => EnvironmentModel)
  environment: EnvironmentModel;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;
}
