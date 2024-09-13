import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import UserModel from 'src/user/infrastructure/models/user.model';

@Table({ tableName: 'mnt_refresh_token', underscored: true })
export default class RefreshTokenModel extends Model<RefreshTokenModel> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.STRING, allowNull: true })
  name: string;

  @Column({ type: DataType.DATE })
  exp: Date;

  @Column({ type: DataType.STRING })
  token: string;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  isValide: boolean;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @HasMany(() => UserModel)
  user: UserModel;
}
