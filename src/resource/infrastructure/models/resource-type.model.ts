import { UUID } from '@shared-decorators';
import {
  Column,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'ctl_resource_type',
  underscored: true,
  paranoid: true,
  timestamps: true,
})
export class ResourceType extends Model {
  @PrimaryKey
  @UUID
  id: string;

  @Column
  name: string;

  @DeletedAt
  deletedAt?: Date;
}
