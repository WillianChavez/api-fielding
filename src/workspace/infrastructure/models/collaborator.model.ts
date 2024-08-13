import {
  BelongsTo,
  Column,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import WorkspaceModel from './workspace.model';
import RoleModel from './role.model';

@Table({
  tableName: 'mnt_collaborator',
  underscored: true,
  paranoid: true,
  timestamps: true,
})
export default class CollaboratorModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  //TODO: Add foreign key constraint user
  user_id: string;
  @ForeignKey(() => WorkspaceModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  workspace_id: string;

  @BelongsTo(() => WorkspaceModel)
  workspace: WorkspaceModel;

  @ForeignKey(() => RoleModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  role_id: string;

  @BelongsTo(() => RoleModel)
  role: RoleModel;

  @DeletedAt
  deleted_at: Date;
}
