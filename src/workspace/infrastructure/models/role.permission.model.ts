import {
  Column,
  DataType,
  DeletedAt,
  ForeignKey,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';
import RoleModel from './role.model';
import PermissionModel from './permission.model';

@Table({
  tableName: 'ctl_role_permission',
  underscored: true,
  paranoid: true,
  timestamps: true,
})
export default class RolePermissionModel extends Model<RolePermissionModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => RoleModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  role_id: string;

  @ForeignKey(() => PermissionModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  permission_id: string;

  @DeletedAt
  deleted_at: Date;
}
