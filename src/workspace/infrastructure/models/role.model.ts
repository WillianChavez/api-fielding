import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  PrimaryKey,
  BelongsToMany,
  Table,
  Model,
  HasMany,
} from 'sequelize-typescript';
import PermissionModel from './permission.model';
import RolePermissionModel from './role.permission.model';
import CollaboratorModel from './collaborator.model';

@Table({
  tableName: 'ctl_role',
  underscored: true,
  paranoid: true,
  timestamps: true,
})
export default class RoleModel extends Model<RoleModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @BelongsToMany(() => PermissionModel, () => RolePermissionModel)
  permissions: PermissionModel[];

  @HasMany(() => CollaboratorModel)
  collaborators: CollaboratorModel[];

  @CreatedAt
  created_at: Date;

  @DeletedAt
  deleted_at: Date;
}
