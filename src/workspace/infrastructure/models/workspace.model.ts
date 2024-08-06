import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  PrimaryKey,
  Table,
  UpdatedAt,
  Model,
  HasMany,
} from 'sequelize-typescript';
import CollaboratorModel from './collaborator.model';

@Table({
  tableName: 'mnt_workspace',
  underscored: true,
  paranoid: true,
  timestamps: true,
})
export default class WorkspaceModel extends Model<WorkspaceModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  count_collaborators: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  link_hash: string;

  @HasMany(() => CollaboratorModel)
  collaborators: CollaboratorModel[];

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}
