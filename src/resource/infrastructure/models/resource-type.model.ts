import { Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'ctl_resource_type',
  underscored: true,
  paranoid: true,
  timestamps: true,
})
export class ResourceType extends Model {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  deletedAt: Date;
}
