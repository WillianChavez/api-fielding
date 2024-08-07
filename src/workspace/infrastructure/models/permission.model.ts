import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  PrimaryKey,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import RoleModel from './role.model';
import RolePermissionModel from './role.permission.model';

@Table({
  tableName: 'ctl_permission',
  underscored: true,
  paranoid: true,
  timestamps: true,
})
export default class PermissionModel extends Model<PermissionModel> {
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

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  description: string;

  @BelongsToMany(() => RoleModel, () => RolePermissionModel)
  roles: RoleModel[];

  @CreatedAt
  created_at: Date;

  @DeletedAt
  deleted_at: Date;
}
